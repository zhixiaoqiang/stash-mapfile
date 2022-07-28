/** Cli command enum */
export enum CommandEnum {
  /** Stash all mapfiles, can be restore */
  stash = 'stash',
  /** Remove all mapfiles, can\`t be restore */
  clean = 'clean',
  /** Restore all mapfiles */
  restore = 'restore'
}

/** Cli command help info */
export const COMMAND_HELP_INFO = `
Usage
  $ stash-mapfile [command] <input>

Commands
  stash - Stash all mapfiles, can be restore
  clean - Remove all mapfiles, can\`t be restore
  restore - Restore all mapfiles

Options
  --version -v - show version
  --help -h - show help info

Examples
  $ stash-mapfile
  $ stash-mapfile restore
`
