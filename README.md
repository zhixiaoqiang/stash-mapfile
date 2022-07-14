# Stash map files

> stash source-map files，and restore them when you need.

> NOTE!: This is to solve the inaccurate positioning of the source code for breakpoint debugging.

## Install

```bash
# npm
npm install -g stash-mapfile
# yarn
yarn global add stash-mapfile
# pnpm
pnpm add -g stash-mapfile
```

## Usage

### Clean

> Remove all mapfiles, can\`t be restore

```bash
stash-mapfile
# or
stash-mapfile clean
```

### Stash

> Stash all mapfiles, can be restore

```shell
stash-mapfile
```

### Restore

> Restore all mapfiles

```shell
stash-mapfile restore
```
