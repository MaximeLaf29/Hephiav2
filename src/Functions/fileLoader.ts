import path from 'path'
import fs from 'fs'

function getAllFilePaths(dir: string): string[] {
    const files = fs.readdirSync(dir)
    const filePaths: string[] = []
    for (const file of files) {
        const filePath = path.join(dir, file)
        const fileStat = fs.statSync(filePath)
        if (fileStat.isDirectory()) {
            filePaths.push(...getAllFilePaths(filePath))
        } else {
            filePaths.push(filePath)
        }
    }
    return filePaths
}

function loadFiles(dirName: string): string[] {
    const directory = `${path.resolve(__dirname, '../')}/${dirName}`

    const files = getAllFilePaths(directory)

    return files
}

export default loadFiles
