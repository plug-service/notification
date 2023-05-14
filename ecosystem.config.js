module.exports = {
  apps: [
    {
      name: 'notification',
      script: './dist/main.js', // use for pm2 start
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env_production: {
        NEST_PORT: 4000,
        NODE_ENV: 'production',
        ENABLE_MODULE_NOTIFICATION: 'false',

        MONGO_URL: 'localhost',
        MONGO_DB_NAME: 'notification',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      path: '/var/www/notification',
      repo: 'git@github.com:plug-service/notification.git',
      'post-deploy': 'yarn install && yarn build && pm2 start --env production', // --env use env_production above
      host: '157.230.245.190',
      ref: 'origin/master',
    },
  },
};
