# Bitbucket Pull Request Webtask
A Webtask that works as a webhook for send an email each time that there is a new pull request on Bitbucket.

## Requirements
1. Webtask account
2. Bitbucket repository
3. Sendgrid API key

## Setup
### Sendgrid
Retrieve a new API Key from *Settings* > *API KEYS*. Make sure that creates a General API Key and select at least **FULL ACCESS** for the **Mail Send** option.

### Webtask
* Install **Webtask CLI**. You can follow the instructions [here](https://webtask.io/cli).
* Create a new task using this file and the following command:

```bash
wt create --secret SENDGRID_KEY=<REPLACE_WITH_YOUR_KEY> --secret EMAIL_TO=<REPLACE_WITH_AN_EMAIL> --secret EMAIL_FROM=<REPLACE_WITH_AN_EMAIL> index.js
```

### Bitbucket
Select the repository go into *Settings > Webhooks* create a new one, select any title paste the *Webtask URL* into the **URL** input and in triggers select **Choose from a full list of triggers** and just select **Pull Request > Created**.

## Roadmap
- [ ] Use ES2015 with babel.
- [ ] Split the logic in modules.
- [ ] Write tests.
- [ ] Add coverage.
- [ ] Include precommit to run lint, tests and coverage
- [ ] Include ghooks to run the precommit
- [ ] Improve template message; Include a HTML template with styles.
- [ ] Detect if the webhook it is a pull request or not.
