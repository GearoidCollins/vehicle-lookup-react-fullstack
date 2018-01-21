export default {
  client: {
    lib: {
      css: [],
    },
    css: [],
    sass: [],
    js: [],
  },
  server: {
    allJS: ['config/**/*.js', 'server/**/*.js', 'client/*/**/*.js'],
    models: ['server/models/*.js'],
    routes: ['server/routes/*.js'],
    config: '',
  },
};
