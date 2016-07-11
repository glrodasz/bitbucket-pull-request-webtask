"use latest";

const sendgrid = require('sendgrid');
const marked = require('marked');

function sendEmail(key, emailTo, emailFrom, subject, message) {
  sendgrid(key).send({
    to: emailTo,
    from: emailFrom,
    subject: subject,
    html: message,
  }, (err, json) => {
    if (err) {
      return console.error(err);
    }
    done(null, json);
  });
}

module.exports = function ({ data }, done) {
  const {
    actor: { username, display_name },
    pullrequest: {  title, source, destination },
    repository: { links: { self, html } },
    SENDGRID_KEY, EMAIL_TO, EMAIL_FROM
  } = data;

  // Check if the source branch has a name
  const getBranchName = source => source && source.branch ?
    source.branch : '(no branch specified)';

  const subject = `${title} - Bitbucket pull request`;

  // The message is pushed in an array for redability
  let message = [];
  message.push(`**${display_name}** *(${username})*:`);
  message.push('has created the following pull request:');
  message.push(`**${title}**`);
  message.push(`from ${getBranchName(source)} to ${getBranchName(destination)}`);

  // Send email via sendgrid
  sendEmail(SENDGRID_KEY, EMAIL_TO, EMAIL_FROM, subject, marked(message.join(' ')));
}
