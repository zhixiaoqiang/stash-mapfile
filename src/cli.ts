import meow from 'meow'
import inquirer from 'inquirer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { CommandEnum, COMMAND_HELP_INFO } from './constants.js'
import { log } from './utils/index.js'
import { removeMapFiles, restoreMapFiles, stashMapFiles } from './core.js'

const __dirname = fileURLToPath(dirname(import.meta.url))

const cli = meow(COMMAND_HELP_INFO, {
  importMeta: import.meta,
  flags: {
    version: {
      type: 'boolean',
      alias: 'v'
    },
    help: {
      type: 'boolean',
      alias: 'h'
    }
  }
})

const [command = CommandEnum.clean] = cli.input

if (CommandEnum.stash === command || CommandEnum.clean === command) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmRemove',
        message: `Are you sure to remove all .map file in the ${__dirname}?`,
        default: false
      }
    ])
    .then(async (answers) => {
      if (!answers.confirmRemove) return
      if (CommandEnum.stash === command) {
        stashMapFiles()
      }

      removeMapFiles()
    })
    .catch((error) => {
      log('Error', error)
    })
} else if (CommandEnum.restore === command) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmRestore',
        message: `Are you sure restore all .map file in the ${__dirname}?`,
        default: false
      }
    ])
    .then(async (answers) => {
      if (!answers.confirmRestore) return
      restoreMapFiles()
    })
    .catch((error) => {
      log('Error', error)
    })
} else {
  log(`Command(${command}) not exist`)
  log(cli.help)
}
