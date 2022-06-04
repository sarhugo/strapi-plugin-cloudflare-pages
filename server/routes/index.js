module.exports = {
  admin: {
    type: 'admin',
    routes: [
      {
        "method": "GET",
        "path": "/",
        "handler": "cloudflarePagesController.index",
        "config": {
          "policies": [{
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::cloudflare-pages.publish"]
            }
          }]
        }
      },
      {
        "method": "POST",
        "path": "/publish",
        "handler": "cloudflarePagesController.publish",
        "config": {
          "policies": [{
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::cloudflare-pages.publish"]
            }
          }]
        }
      }
    ]
  }
};