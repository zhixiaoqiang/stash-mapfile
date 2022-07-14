import { globby } from 'globby'
import { remove } from 'fs-extra'
import meow from 'meow'
import { execa } from 'execa'
import inquirer from 'inquirer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { CommandEnum, COMMAND_HELP_INFO } from './constants.js'
import { log } from './utils/index.js'

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
        try {
        /** check git exist & had log */
          log('check git exist & had log')
          await execa('git', ['log', '--oneline'])
        } catch (error) {
        /** init git & commit */
          log('init git & commit')
          await execa('git', ['init'])
          await execa('git', ['add', '-A'])
          await execa('git', ['commit', '-m', 'chore: create a temp commit'])
        }
      }

      log('remove *.map file')
      const result = await globby(['./**/*.map'])
      if (result.length) {
        await Promise.all(result.map(path => remove(path)))
      }
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
      try {
        log('git checkout -- "*.map"')
        await execa('git', ['checkout', '--', '*.map'])
        log('remove git')
        await execa('rm', ['-rf', '.git'])
      } catch (error) {
        log('no git, you can run stash-mapfile')
      }
    })
    .catch((error) => {
      log('Error', error)
    })
} else {
  log(`Command(${command}) not exist`)
  log(cli.help)
}
