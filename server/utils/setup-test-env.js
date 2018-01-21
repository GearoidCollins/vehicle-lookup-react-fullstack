require('mock-css-modules');

const { JSDOM } = eval("require('jsdom')");
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');

enzyme.configure({ adapter: new Adapter() });

// Ignore assets
require.extensions['.jpg'] = noop => noop;
require.extensions['.jpeg'] = noop => noop;
require.extensions['.png'] = noop => noop;
require.extensions['.gif'] = noop => noop;
require.extensions['.scss'] = noop => noop;

require('babel-register');
require('babel-polyfill');

global.window = new JSDOM('<body></body>').window;
global.document = window.document;
global.navigator = window.navigator;
