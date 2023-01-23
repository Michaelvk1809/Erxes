module.exports = {
  name: 'chats',
  port: 3110,
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3110/remoteEntry.js',
    scope: 'chats',
    module: './routes'
  },
  menus: [
    {
      text: 'Chat',
      url: '/erxes-plugin-chat',
      icon: 'icon-chat-1',
      location: 'mainNavigation',
      permission: 'showChats'
    }
  ]
};
