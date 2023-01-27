import DiscordBot from '../Client/discordBot'
import loadFiles from '../Functions/fileLoader'
import { Event } from '../types/Event'

async function loadEvents(client: DiscordBot) {
    await client.events.clear()

    const Files = await loadFiles('Events')

    Files.forEach(async (filePath: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
        const { default: file }: { default: Event<any> } = await import(
            filePath
        )

        client.events.set(file.name, file.listener)

        if (file.rest) {
            if (file.once) {
                client.rest.once(file.name, file.listener)
            } else {
                client.rest.on(file.name, file.listener)
            }
        } else {
            if (file.once) {
                client.once(file.name, file.listener)
            } else {
                client.on(file.name, file.listener)
            }
        }
        console.log(file.name, '🟩')
    })

    return console.log(
        client.reloading ? '\nEvents Reloaded.' : '\nEvents Loaded.'
    )
}

export default loadEvents
