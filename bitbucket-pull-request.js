'use latest';

const sendgrid = require('sendgrid'); // eslint-disable-line
const marked = require('marked'); // eslint-disable-line

/**
 * Get the branch name based on the source
 * @param {object} source - Source from Bitbucket payload
 * @return {string} branch name
 */
function getBranchName(source) {
  return source && source.branch && source.branch.name ?
    source.branch.name : '(no branch specified)';
}

/**
 * Send email using Sendgrid
 * @param {string} key - Sendgrid API Key
 * @param {string} emailTo - Email to send
 * @param {string} emailFrom - Email from send
 * @param {string} subject - Subject of the message
 * @param {string} message - HTML string of the message
 * @param {Function} cb - Callback for sucess response
 * @return {void}
 */
function sendEmail(key, emailTo, emailFrom, subject, message, cb) {
  sendgrid(key).send({
    subject,
    to: emailTo,
    from: emailFrom,
    html: message,
  }, (err, json) => {
    if (err) {
      return console.error(err);
    }
    return cb(null, json);
  });
}

/**
 * Build the message for the email
 * @param {object} data - Data from Bitbucket payload
 * @return {void}
 */
function buildMessage(data) {
  const {
    actor: { username, display_name },
    pullrequest: { links, title, source, destination },
    repository: { name },
  } = data;

  // The message is pushed in an array for redability
  const message = [];
  message.push(`**${display_name}** *(${username})*`); // eslint-disable-line
  message.push('has created the pull request:');
  message.push(`**${title}** of **${name}** repository`);
  message.push(`from **${getBranchName(source)}** to **${getBranchName(destination)}**`);
  message.push(`click [here](${links.html.href}) to review it.`);

  return marked(message.join(' '));
}

module.exports = function webtask({ data }, done) {
  const { pullrequest: { title }, SENDGRID_KEY, EMAIL_TO, EMAIL_FROM } = data;
  const subject = `${title} - Bitbucket pull request`;

  sendEmail(SENDGRID_KEY, EMAIL_TO, EMAIL_FROM, subject, buildMessage(data), done);
};
