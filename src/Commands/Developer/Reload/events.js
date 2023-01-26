const { ChatInputCommandInteraction, Client } = require('discord.js')
const { loadEvents } = require('../../../Handlers/eventHandler')
ChatInputCommandInteraction
Client
module.exports = {
    subCommand: 'reload.events',
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        for (const [key, value] of client.events) {
            client.removeListener(`${key}`, value, true)
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
