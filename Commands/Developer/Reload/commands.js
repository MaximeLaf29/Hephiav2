// const { ChatInputCommandInteraction, Client } = require('discord.js')
const { loadCommands } = require('../../../Handlers/commandHandler')

module.exports = {
    subCommand: 'reload.commands',
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        client.reloading = true
        loadCommands(client)
        interaction
            .reply({ content: 'Reloaded Commands', ephemeral: true })
            .catch(
                console.log(
                    "Can't reply to interaction! " +
                        __filename +
                        ', ' +
                        this.execute.name
                )
            )
    }
}
