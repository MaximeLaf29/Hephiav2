const { Message } = require('discord.js')
Message

// Message deleted event handler
module.exports = {
    name: 'messageDelete',
    /**
     *
     * @param {Message} message
     * @param {client} client
     */
    execute(message, client) {
        console.log(message)
        console.log(client)
    }
}
