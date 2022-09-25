const ping = require('../').default;

ping('play.oc.tc').then(console.log).catch(console.warn);
