import options from './config';
import options_hp from './config_hp';
import initGraph from './graphtool.js';

initGraph(Object.assign(options, options_hp));
