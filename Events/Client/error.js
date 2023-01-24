const { Error, MessageEmbed } = require('discord.js')
const { loadCommands } = require('../../Handlers/commandHandler')
module.exports = {
    name: 'error',
    /**
     *
     * @param {Error} error
     * @param {client} client
     */
    execute(error, client) {
        console.log('An error occurred! -> ' + error)
    },
}
