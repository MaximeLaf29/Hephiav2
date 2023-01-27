import loadCommands from '../../Handlers/commandHandler'
import { Events } from 'discord.js'
import DiscordBot from '../../Client/discordBot'
import { Event } from '../../types/Event'

const clientReady: Event<Events.ClientReady> = {
    name: Events.ClientReady,
    listener: async (client: DiscordBot) => {
        console.log('The Client is now ready.')
        loadCommands(client)
        // At this point, the bot should check if each Guild it's in has a proper config in the DB!
        // check for whitelist system
        // age check system (for later)
        // system to check the userlistlastseen database to compare with current list of members of each guild
        //    and update the data of whoever isn't in the list (guild) anymore for each guild. (this is a protection against outages)
    }
}

export default clientReady
