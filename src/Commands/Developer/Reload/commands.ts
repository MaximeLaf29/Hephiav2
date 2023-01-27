import { ChatInputCommandInteraction } from 'discord.js'
import DiscordBot from '../../../Client/discordBot'
import loadCommands from '../../../Handlers/commandHandler'

const reloadCommandSub = {
    subCommand: 'reload.commands',
    execute(interaction: ChatInputCommandInteraction, client: DiscordBot) {
        client.reloading = true
        loadCommands(client)
        interaction
            .reply({ content: 'Reloaded Commands', ephemeral: true })
            .catch((err) => {
                console.log('Error while replying to the message: ' + err)
            })
    }
}

export default reloadCommandSub
