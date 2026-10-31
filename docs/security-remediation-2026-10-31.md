# Security remediation: 31 October 2026

Legacy audit commands use a reviewed compatibility bridge with current audit dependencies. Unsupported browsers and missing/nonfinite metrics fail. Tracked node_modules was removed; GoRest credentials now come from a local environment variable and request logging is disabled.

Validation: 4 audit-bridge regression fixtures passed; npm/OSV lock audits passed.

Known advisory check: 722 exact/resolved dependency coordinates; 10 npm lock audit(s); 0 npm findings; 0 unaddressed OSV coordinates. Verified local backport coordinates retained explicitly: 0. This is a dated advisory result, not a security certification.

Browser integration and external target tests were not run. Revoke the formerly committed GoRest token. One pre-existing external submodule pointer is outside this repository scan.

The commit hook is enabled per checkout only. Pull-request and scheduled CI repeat the checks. Required GitHub branch checks must be configured after their job names register; adding this workflow alone does not enforce branch protection. Review security updates before merging; no automatic merge or deployment is enabled by this change.
