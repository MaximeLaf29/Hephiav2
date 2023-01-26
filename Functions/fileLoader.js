const { glob } = require('glob')
const { promisify } = require('util')
const proGlob = promisify(glob)

/**
 * @classdesc Loads all the files in the given directory
 * @param {String} dirName directory to load
 * @returns
 */
async function loadFiles(dirName) {
    const Files = await proGlob(
        `${process.cwd().replace(/\\/g, '/')}/${dirName}/**/*.js`
    )
    Files.forEach((file) => delete require.cache[require.resolve(file)])
    return Files
}

module.exports = { loadFiles }
