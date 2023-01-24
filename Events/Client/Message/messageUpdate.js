const { Message, MessageEmbed } = require('discord.js')
const fileContext = 'Events/Client/Message/messageUpdate.js, execute()'

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
    }
}
