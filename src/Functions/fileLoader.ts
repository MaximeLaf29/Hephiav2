import { glob } from 'glob'
import { promisify } from 'util'

const proGlob = promisify(glob)

async function loadFiles(dirName: string) {
    const Files = await proGlob(
        `${process.cwd().replace(/\\/g, '/')}/src/${dirName}/**/*.?(js|ts)`
    )
    Files.forEach((file) => delete require.cache[require.resolve(file)])
    return Files
}

export default loadFiles
