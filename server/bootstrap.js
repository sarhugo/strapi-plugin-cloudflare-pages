'use strict';

module.exports = async ({ strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Publish changes via Cloudflare Pages',
      uid: 'publish',
      pluginName: 'cloudflare-pages',
    },
  ];
  const { actionProvider } = strapi.admin.services.permission;
  await actionProvider.registerMany(actions);
};