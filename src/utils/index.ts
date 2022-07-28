/** if env has verbose, then show log */
export const log = (...args: Parameters<typeof console.log>) => {
  if (process.env.verbose) {
    console.log(...args)
  }
}
