import options from './config';
import options_free from './config_free';
import initGraph from './graphtool.js';

initGraph(Object.assign(options, options_free));
