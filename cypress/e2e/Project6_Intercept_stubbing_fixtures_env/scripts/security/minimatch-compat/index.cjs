// Keep legacy CommonJS call sites while all matching uses patched upstream code.
const upstream = require('minimatch-core');
function adaptClass(Base) {
  return class LegacyMinimatch extends Base {
    constructor(...args) {
      super(...args);
      this.set.forEach((row, r) => row.forEach((part, c) => {
        if (part && typeof part === 'object' && typeof part.test === 'function' && !(part instanceof RegExp)) {
          // glob 7 reads this metadata and calls String.match on each segment.
          part._glob = this.globParts[r][c];
          part[Symbol.match] = value => part.test(value) ? [value] : null;
        }
      }));
    }
    static defaults(options) { return adaptClass(super.defaults(options)); }
  };
}
function compatible(core) {
  const match = (...args) => (typeof core === 'function' ? core(...args) : core.minimatch(...args));
  return Object.assign(match, core, {
    minimatch: match,
    Minimatch: adaptClass(core.Minimatch),
    defaults: options => compatible(core.defaults(options)),
  });
}
module.exports = compatible(upstream);
// Explicit assignments expose named exports to Node's CommonJS/ESM bridge.
module.exports.minimatch = module.exports;
module.exports.Minimatch = module.exports.Minimatch;
module.exports.defaults = module.exports.defaults;
module.exports.filter = module.exports.filter;
module.exports.match = module.exports.match;
module.exports.makeRe = module.exports.makeRe;
module.exports.braceExpand = module.exports.braceExpand;
module.exports.escape = module.exports.escape;
module.exports.unescape = module.exports.unescape;
module.exports.GLOBSTAR = module.exports.GLOBSTAR;
module.exports.AST = module.exports.AST;
