/** if env has verbose, then show log */
export const log = (...args) => {
    if (process.env.verbose) {
        console.log(...args);
    }
};
