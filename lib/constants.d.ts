/** Cli command enum */
export declare enum CommandEnum {
    /** Stash all mapfiles, can be restore */
    stash = "stash",
    /** Remove all mapfiles, can\`t be restore */
    clean = "clean",
    /** Restore all mapfiles */
    restore = "restore"
}
/** Cli command help info */
export declare const COMMAND_HELP_INFO = "\nUsage\n  $ stash-mapfile [command] <input>\n\nCommands\n  stash - Stash all mapfiles, can be restore\n  clean - Remove all mapfiles, can`t be restore\n  restore - Restore all mapfiles\n\nOptions\n  --version -v - show version\n  --help -h - show help info\n\nExamples\n  $ stash-mapfile\n  $ stash-mapfile restore\n";
