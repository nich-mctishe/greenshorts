
A NextJs framework extension, dockerised and built to use the Wercker CI tool and Dokku for deployment.

# Versions

- **1.0.1**
  Uses next 6

- **2.0.1**
  Uses next 8.

# System requirements

- Docker: 18.09.2, build 6247962
- Wercker: 1.0.1467
- NextJS: 8.0.2
- Webpack 4


## Local Development

### Prerequisites

You must have Docker and Wercker Cli installed before beginning.

### Getting Started

* Clone this repo
* cd into the root of the repo and run `tools/dev`

The application should now be running on port 80. You will be attached to the running container and the log viewer will run.

If you need to run adhoc commands, hit `ctrl+c` to exit the log viewer. You can return to the log viewer by simply running `log`

To exit fully from the container, hit `ctrl+c` to exit the log viewer and then type `exit` to exit the container.

### Environment

Any environment variables which need to be supplied when developing locally can be placed in the `ENVIRONMENT` file, with variable names prefixed with `X_`. For any variables which you don't want adding to the repository can be added to the `ENVIRONMENT_LOCAL.template` file, without the `X_` prefix. If this template file is not empty, the application will not start without an `ENVIRONMENT_LOCAL` file being created.

### Seeding
this framework uses the node-seeder package to facilitate the quick seeding and updating of data.
check out https://github.com/nich-mctishe/node-seeder for more info.

## Upgrading

### Docker base images

You should periodically update the node base image as new versions are released. To do so, update the node box in `wercker.yml` and the base image in `dokku/Dockerfile` for deployment.

## Deployment

The framework is setup to deploy to a Dokku instance using Wercker.

### Wercker Project Setup

1. Navigate to your project and open the `Workflows` tab
2. Click `Add new pipeline`
3. Fill in the form:
    - **Name** - [staging/production]
    - **YML Pipeline name** - deploy
    - **Hook type** - default
4. Click the `Create` button
5. On the resulting page, create a new SSH key by clicking the `Generate SSH Keys` link below and to the right of the Pipeline environment variables section:
    - **SSH key name** - DOKKU_KEY
6. Create three environment variables:
    - **DOKKU_HOST** - String - [your dokku host ip or fqdn]
    - **DOKKU_APP** - String - next
7. Go back to the `Workflows` tab
8. click the `+ icon` next the the `build` workflow.
9. Enter the branch you wish to deploy, select the pipeline you just created for the execute pipeline, and click `Add`

### Dokku Server Setup

Once you've booted your Dokku server, on the installation screen, copy and paste the public SSH key from the Wercker Project target. Then run the following steps:

```bash
# Set some environment variables
export MONGO_IMAGE_VERSION="3.4.4"

# Install Mongo Dokku plugin
dokku plugin:install https://github.com/dokku/dokku-mongo.git

# Create our next app
dokku apps:create next

# Create our Mongo service and link to our next app
dokku mongo:create next-db
dokku mongo:link next-db next

# Create our volumes

# Mount our volumes

# Restart our application on failure
dokku docker-options:add next deploy --restart=always

# Set our config values
dokku config:set next DEBUG="req,app,app:*"
dokku config:set next DEBUG_COLORS="1"
dokku config:set next COOKIE_SECRET="$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c64)"
dokku config:set next GOOGLE_ANALYTICS_ID="[ga_id]"

# Setup out domains
dokku domains:add next example.com
dokku domains:add next www.example.com

# Setup any ssl certificates from string, tarball or stdin
dokku certs:add next certs.tar
```
