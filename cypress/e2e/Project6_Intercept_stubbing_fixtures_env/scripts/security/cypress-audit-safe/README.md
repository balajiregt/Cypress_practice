# Local Cypress audit bridge

Derived from mfrachet/cypress-audit 1.1.0 (MIT; LICENSE.md retained).
This explicitly named private fork retains cy.lighthouse/cy.pa11y and task callback
interfaces while using current Lighthouse, Pa11y, Puppeteer and Axe runner releases.
It uses the modern Lighthouse ESM entrypoint, scopes the debugging port to the
module, disconnects its CDP client, and fails if a browser/metric is unsupported.

Zero numeric values and missing/non-finite metrics are tested. Current Lighthouse
no longer reports PWA; an explicitly requested unavailable metric fails rather
than being silently accepted. This is not a claim that external application
audits have passed. The original default thresholds are preserved.

The packed archive is compared with this source before security audits. There
are no build or installation hooks, remote fork downloads, or publications.
