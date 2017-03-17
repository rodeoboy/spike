var context = require.context('./ClientApp', true, /\.spec\.ts?$/);
context.keys().forEach(context);
//module.exports = context;