import { globby } from 'globby'
import { remove } from 'fs-extra'

(async function main () {
  const result = await globby(['./**/*.map'])
  if (result.length > 0) {
    await Promise.all(result.map(path => remove(path)))
  }
})()
