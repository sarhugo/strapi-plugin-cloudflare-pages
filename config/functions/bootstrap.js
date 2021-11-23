'use strict';

module.exports = async () => {
  await registerPermissionActions();
};

const registerPermissionActions = async () => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Publish changes via Cloudflare Pages',
      uid: 'publish',
      pluginName: 'cloudflare-pages',
    },
  ];
  
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
}