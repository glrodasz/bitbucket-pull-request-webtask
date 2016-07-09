"use lastest";

module.exports = function ({ data: { actor, pullrequest, repository } }, done) {
  const { username, display_name } = actor;
  const { title, description, source, destination } = pullrequest;
  const { links: { self, html } } = repository;

  console.log(`${display_name} (${username}), has opened the following pull request **${title}** that says \"${description}\" from ${source.branch} to ${destination.branch}`);
  console.log(self, html);

  done(null, 'Done');
}
