/** Cli command enum */
export var CommandEnum;
(function (CommandEnum) {
  /** Stash all mapfiles, can be restore */
  CommandEnum.stash = 'stash'
  /** Remove all mapfiles, can\`t be restore */
  CommandEnum.clean = 'clean'
  /** Restore all mapfiles */
  CommandEnum.restore = 'restore'
})(CommandEnum || (CommandEnum = {}))
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
