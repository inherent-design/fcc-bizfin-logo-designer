# @fcc-bizfin-logo-designer/web

## 0.1.6

### Patch Changes

- 601f053: Configure and use pnpm deploy during workflows for faster builds and safer dependency trees
- a65ab5d: Fix multi-arch manifest generation steps to no longer override each other
- 9c18c7e: Add missing repo checkout before manifests are merged
- a605a35: Copy missing pnpm-lock.yaml in workflows during installation
- 1d22fd5: Fix incorrect pnpm-workspace.yaml setting: force-legacy-deploy -> forceLegacyDeploy
- 5fe1e33: Fix NODE_ENV issues in development builds

## 0.1.5

### Patch Changes

- a37493a: Fix CI/CD workflow bug triggering builds on main

## 0.1.4

### Patch Changes

- eb987ce: Fix release system CI definition bug

## 0.1.3

### Patch Changes

- 8a1fd41: Initialize release system; hello world
