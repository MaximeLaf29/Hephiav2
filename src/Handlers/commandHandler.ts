import DiscordBot from '../Client/discordBot'
import loadFiles from '../Functions/fileLoader'

async function loadCommands(client: DiscordBot) {
    await client.commands.clear()
    await client.subCommands.clear()

    const commandsArray: any[] = []

    const Files = await loadFiles('Commands')

    Files.forEach(async (filePath: string) => {
        const command = await import(filePath)

        // If the command file loaded has subcommand(s) inside it
        if (command.subCommand) {
            return client.subCommands.set(command.subCommand, command)
        }

        client.commands.set(command.data.name, command)

        commandsArray.push(command.data.toJSON())

        console.log(command.data.name, '🟩')
    })

    client.application?.commands.set(commandsArray)

    return console.log(
        client.reloading ? '\nCommands Reloaded.' : '\nCommands Loaded.'
    )
}

module.exports = { loadCommands }
