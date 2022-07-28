import { execa } from 'execa'
import { remove } from 'fs-extra'
import { globby } from 'globby'

import { log } from './utils'

/** Stash all mapfiles, can be restore */
export async function stashMapFiles () {
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

/** Remove all mapfiles, can\`t be restore */
export async function removeMapFiles () {
  log('remove *.map file')
  const result = await globby(['./**/*.map'])
  if (result.length) {
    await Promise.all(result.map(path => remove(path)))
  }
}

/** Restore all mapfiles */
export async function restoreMapFiles () {
  try {
    log('git checkout -- "*.map"')
    await execa('git', ['checkout', '--', '*.map'])
    log('remove git')
    await execa('rm', ['-rf', '.git'])
  } catch (error) {
    log('no git, you can run stash-mapfile')
  }
}
