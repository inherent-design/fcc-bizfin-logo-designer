# @fcc-bizfin-logo-designer/api

## 0.0.9

### Patch Changes

- b477b45: Add null check to expected value in development workflows

## 0.0.8

### Patch Changes

- 2f97747: Explicitly use Vite's `--mode` flag to set development build's type to not be production

## 0.0.7

### Patch Changes

- 2fd28d2: Release workflows do not trigger builds, so manually run them after releases

## 0.0.6

### Patch Changes

- a2620f8: Fix tag watched by workflow for release builds

## 0.0.5

### Patch Changes

- 601f053: Configure and use pnpm deploy during workflows for faster builds and safer dependency trees
- a65ab5d: Fix multi-arch manifest generation steps to no longer override each other
- 9c18c7e: Add missing repo checkout before manifests are merged
- a605a35: Copy missing pnpm-lock.yaml in workflows during installation
- 1d22fd5: Fix incorrect pnpm-workspace.yaml setting: force-legacy-deploy -> forceLegacyDeploy
- 5fe1e33: Fix NODE_ENV issues in development builds

## 0.0.4

### Patch Changes

- a37493a: Fix CI/CD workflow bug triggering builds on main

## 0.0.3

### Patch Changes

- eb987ce: Fix release system CI definition bug

## 0.0.2

### Patch Changes

- 8a1fd41: Initialize release system; hello world
