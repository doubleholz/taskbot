module.exports = {
    apps : {
      name        : "index",
      script      : "npm",
      args        : "start",
      restart_delay : "5000",
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
         "NODE_ENV": "production"
      }
    }
  }