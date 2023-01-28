import { ApplicationCommandDataResolvable } from 'discord.js'
import DiscordBot from '../Client/discordBot'
import loadFiles from '../Functions/fileLoader'
import ascii from '@estarink/ascii-table'

async function loadCommands(client: DiscordBot) {
    await client.commands.clear()
    await client.subCommands.clear()
    const table = new ascii('List of Commands').setHeading('Commands', 'Status')

    const commandsArray: ApplicationCommandDataResolvable[] = []

    const Files = await loadFiles('Commands')

    const importPromises = Files.map(async (filePath: string) => {
        const { default: command } = await import(filePath)

        // If the command file loaded has subcommand(s) inside it
        if (command.subCommand) {
            return client.subCommands.set(command.subCommand, command)
        }

        client.commands.set(command.data.name, command)

        commandsArray.push(command.data.toJSON())

        table.addRow(command.data.name, '🟩')
    })

    await Promise.all(importPromises)

    client.application?.commands.set(commandsArray)

    return console.log(
        table.toString(),
        client.reloading ? '\nCommands Reloaded.' : '\nCommands Loaded.'
    )
}

export default loadCommands
