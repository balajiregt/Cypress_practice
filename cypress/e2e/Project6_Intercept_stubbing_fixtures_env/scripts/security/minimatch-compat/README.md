# Legacy matcher compatibility

This small local adapter keeps the callable CommonJS export and glob 7 segment
metadata while delegating matching and resource limits to upstream minimatch 11.0.3.
It does not copy or claim to be a different version of upstream minimatch. The
minimatch-core dependency is an npm alias whose canonical name remains minimatch
in the lockfile and vulnerability inventory.

The checked-in archive is an npm override input, not an install script. npm resolves
relative directory overrides inside each dependent package; using a local packed
archive avoids those broken links. verify-local-packages.py compares every packed
file with this source before audits. No remote fork or registry publication is used.

Remove the override when all dependent tools support the patched upstream directly.
Regression validation covers callable/named exports, default options, segment
matching and actual glob 7 synchronous/callback traversal on dummy files.
