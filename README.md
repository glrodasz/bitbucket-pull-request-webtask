# Bitbucket Pull Request Webtask
A Webtask that works as a webhook for send an email each time that there is a pull request.

### Requirements
1. Webtask account
2. Bitbucket repository
3. Sendgrid API key

### Setup
#### Sendgrid
Retrieve a new API Key from *Settings* > *API KEYS*. Make sure that creates a General API Key and select at least **FULL ACCESS** for the **Mail Send** option.

#### Webtask
* Install **Webtask CLI**. You can follow the instructions [here](https://webtask.io/cli).
* Create a new task using this file and the following command:

```bash
wt create --secret SENDGRID_KEY=<REPLACE-WITH-YOUR KEY> --secret EMAIL_TO=<REPLACE-WITH-AN-EMAIL> --secret EMAIL_FROM=<REPLACE-WITH-AN-EMAIL> bitbucket-pull-request.js
```

#### Bitbucket
Select the repository go into *Settings > Webhooks* create a new one, select any title paste the *Webtask URL* into the **URL** input and in triggers select **Choose from a full list of triggers** and just select **Pull Request > Created**.

Enjoy! c:
