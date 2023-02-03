import path from 'path'
import fs from 'fs/promises'

async function getAllFilePaths(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir)
    const filePaths: string[] = []
    for (const file of files) {
        const filePath = path.join(dir, file)
        const fileStat = await fs.stat(filePath)
        if (fileStat.isDirectory()) {
            filePaths.push(...(await getAllFilePaths(filePath)))
        } else {
            filePaths.push(filePath)
        }
    }
    return filePaths
}

async function fileLoader(dirName: string): Promise<string[]> {
    const directory = `${path.resolve(__dirname, '../')}/${dirName}`

    const files = await getAllFilePaths(directory)

    return files
}

export default fileLoader
