module.exports = {
    apps: [
      {
        name: 'Skullcandy',
        cwd: '/var/www/html/backend',
        script: 'npm',
        args: 'develop',
        env: {
          DATABASE_HOST: 'localhost',
          DATABASE_PORT: '3306',
          DATABASE_NAME: 'skullcandy_stagedb',
          DATABASE_USERNAME: 'skullcandy_stageusr',
          DATABASE_PASSWORD: '0oOpoW4zP2VT6',
        },
	exp_backoff_restart_delay: 100,
      },
    ],
  };
