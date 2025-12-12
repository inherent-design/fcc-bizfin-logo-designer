# Contributing

## Commits

**Format:** `type: brief description` (3-7 words)

**Types:** `feat`, `fix`, `refactor`, `chore`, `dev-ops`

**Examples:**

```bash
feat: (web) add version display
fix: logo toggle restore logic
chore: update deps; rotate tokens
```

**Rules:**

- No commit bodies
- Use semicolons for multi-action
- Use `(web)` or `(api)` for package scope

## Changesets

**When:** User-facing changes only (features, fixes, breaking changes)

**Skip:** Internal refactors, docs, tests, build config

**Create:**

```bash
pnpm changeset
# Select packages, bump type, write 7-15 word summary
git add .changeset/*.md
git commit -m "chore: add changeset"
```

**Summary style:**

```
Fix logo toggle state restoration from localStorage
Add CI/CD workflows for Docker builds
```

**Version bumps:**

- `feat:` → minor
- `fix:` → patch
- Breaking → major

## Releases

Automated via GitHub Actions:

1. Push changes + changesets to main
2. Bot creates "Version Packages" PR
3. Merge when ready → tags created → Docker builds triggered

Review/merge PR:

```bash
gh pr merge <pr-number>
```

## Code Style

ESLint + Prettier enforce standards. Pre-commit hooks run automatically.
