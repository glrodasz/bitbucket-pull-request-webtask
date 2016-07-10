"use latest";

module.exports = function ({ data }, done) {
  const {
    actor: { username, display_name },
    pullrequest: { title, description, source, destination },
    repository: { links: { self, html } }
  } = data;

  const getBranchName = branch => branch && branch.name ?
    branch.name : '(no branch specified)';

  let message = [];
  message.push(`${display_name} (${username})`);
  message.push(', has opened the following pull request');
  message.push(`**${title}** that *${description}*`);
  message.push(`from ${getBranchName(source)} to ${getBranchName(destination)}`);

  console.log(message.join(' '), self, html);

  done(null, 'Done');
}
