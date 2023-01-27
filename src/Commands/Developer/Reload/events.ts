import { ChatInputCommandInteraction } from 'discord.js'
import DiscordBot from '../../../Client/discordBot'
import loadEvents from '../../../Handlers/eventHandler'

const eventsCommandSub = {
    subCommand: 'reload.events',
    execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        for (const [key, value] of client.events) {
            client.removeListener(`${key}`, value)
        }
        client.reloading = true
        loadEvents(client)
        interaction
            .reply({ content: 'Reloaded Events', ephemeral: true })
            .catch((err) => {
                console.log(
                    "Can't reply to interaction! " +
                        __filename +
                        ', ' +
                        this.execute.name +
                        ' | Error: ' +
                        err.message
                )
            })
    }
}

export default eventsCommandSub
