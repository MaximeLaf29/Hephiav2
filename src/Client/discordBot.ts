import { Client, ClientOptions, Collection } from 'discord.js'
import configDev from '../config.json'

class DiscordBot extends Client {
    developers: string[]
    creator: string
    reloading: boolean

    commands: Collection<string, any>
    subCommands: Collection<string, any>
    events: Collection<string, any>
    guildConfigs: Collection<string, any>
    db: any

    constructor(options: ClientOptions) {
        super(options)
        this.developers = configDev.developersID
        this.creator = configDev.creatorID

        this.reloading = false

        this.commands = new Collection<string, any>()
        this.subCommands = new Collection<string, any>()
        this.events = new Collection<string, any>()
        this.guildConfigs = new Collection<string, any>()
    }
}

export default DiscordBot
