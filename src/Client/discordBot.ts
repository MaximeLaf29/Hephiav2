import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection
} from 'discord.js'
import { CommandType } from '../types/Command'

import fileLoader from '../Functions/fileLoader'
import { RegisterCommandsOptions } from '../types/Client'
import { Event } from '../Structures/Event'
import importFile from '../Functions/importFile'

class DiscordBot extends Client {
    commands: Collection<string, CommandType> = new Collection()

    constructor() {
        super({ intents: 130943 })
    }

    start() {
        this.registerModules()
        this.login(process.env.TOKEN)
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands)
            console.log(`Registering commands to ${guildId}`)
        } else {
            this.application?.commands.set(commands)
            console.log(`Registering commands globally`)
        }
    }

    async registerModules() {
        console.log('Registering modules')
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = []
        const commandFiles = await fileLoader('Commands')
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await importFile(filePath)
            if (!command.name) return

            this.commands.set(command.name, command)
            slashCommands.push(command)
        })

        //Events
        const eventFiles = await fileLoader('Events')
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await importFile(filePath)
            this.on(event.event, event.run)
        })
    }
}

export default DiscordBot
