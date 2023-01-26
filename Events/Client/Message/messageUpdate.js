const { Message } = require('discord.js')
Message

// Message updated event handler
module.exports = {
    name: 'messageUpdate',
    /**
     *
     * @param {Message} oldMessage
     * @param {Message} newMessage
     * @param {client} client
     */
    async execute(message, client) {
        // Loggings to discord following guild's config
        console.log(message + client)
    }
}
