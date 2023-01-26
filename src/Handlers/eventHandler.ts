import DiscordBot from '../Client/discordBot'
import loadFiles from '../Functions/fileLoader'

async function loadEvents(client: DiscordBot) {
    await client.events.clear()

    const Files = await loadFiles('Events')

    Files.forEach(async (filePath: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const file = await import(filePath)

        client.events.set(file.name, file.execute)

        if (file.rest) {
            if (file.once) {
                client.rest.once(file.name, file.execute)
            } else {
                client.rest.on(file.name, file.execute)
            }
        } else {
            if (file.once) {
                client.once(file.name, file.execute)
            } else {
                client.on(file.name, file.execute)
            }
        }
        console.log(file.name, '🟩')
    })

    return console.log(
        client.reloading ? '\nEvents Reloaded.' : '\nEvents Loaded.'
    )
}

export default loadEvents
