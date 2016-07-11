'use latest';

const sendgrid = require('sendgrid'); // eslint-disable-line
const marked = require('marked'); // eslint-disable-line

function getBranchName(source) {
  return source && source.branch && source.branch.name ?
    source.branch.name : '(no branch specified)';
}

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

function buildMessage(data) {
  const {
    actor: { username, display_name },
    pullrequest: { title, source, destination },
  } = data;

  // The message is pushed in an array for redability
  const message = [];
  message.push(`**${display_name}** *(${username})*:`); // eslint-disable-line
  message.push('has created the following pull request:');
  message.push(`**${title}**`);
  message.push(`from ${getBranchName(source)} to ${getBranchName(destination)}`);

  return marked(message.join(' '));
}

module.exports = function webtask({ data }, done) {
  const { pullrequest: { title }, SENDGRID_KEY, EMAIL_TO, EMAIL_FROM } = data;
  const subject = `${title} - Bitbucket pull request`;

  sendEmail(SENDGRID_KEY, EMAIL_TO, EMAIL_FROM, subject, buildMessage(data), done);
};
