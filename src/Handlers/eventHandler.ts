import DiscordBot from '../Client/discordBot'
import loadFiles from '../Functions/fileLoader'
import { Event } from '../types/Event'

async function loadEvents(client: DiscordBot) {
    await client.events.clear()

    const Files = await loadFiles('Events')

    Files.forEach(async (filePath: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
        const {
            default: file
        }: { default: Event<any> & { execute: () => void } } = await import(
            filePath
        )

        client.events.set(file.name, file.listener ?? file.execute)

        if (file.rest) {
            if (file.once) {
                client.rest.once(file.name, file.listener ?? file.execute)
            } else {
                client.rest.on(file.name, file.listener ?? file.execute)
            }
        } else {
            if (file.once) {
                client.once(file.name, file.listener ?? file.execute)
            } else {
                client.on(file.name, file.listener ?? file.execute)
            }
        }
        console.log(file.name, '🟩')
    })

    return console.log(
        client.reloading ? '\nEvents Reloaded.' : '\nEvents Loaded.'
    )
}

export default loadEvents
