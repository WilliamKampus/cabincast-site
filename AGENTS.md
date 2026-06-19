# CabinCast Website — Agent Working Rules

This repository is the public website for CabinCast.

## Repository roles

- `WilliamKampus/cabincast-site` is the public website repository. Use it for
  public pages, website assets, `CNAME`, language switching, privacy/support
  pages, and anything that should deploy to the public website.
- `WilliamKampus/CabinCast` is the private app-development repository. Use it
  for iOS app code, Xcode projects, extensions, diagnostics/backend schema,
  TestFlight tooling, product docs, and internal engineering notes.
- Keep app source, backend SQL, credentials, TestFlight files, and internal
  engineering docs out of this repository.

## Validation

- For copy/static-site changes, run `git diff --check`.
- If layout or responsive behavior changes, inspect the affected page locally
  before pushing.
