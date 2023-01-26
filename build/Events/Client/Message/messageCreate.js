"use strict";
const { Message } = require('discord.js');
Message;
// Message creation event handler
module.exports = {
    name: 'messageCreate',
    /**
     *
     * @param {Message} message
     * @param {client} client
     */
    async execute(message, client) {
        this.execute.name = 'execute()';
        if (message.author.bot)
            return;
        // Actions
        // console.log(message.content)
        /*message.reply('hahah!').catch(
            console.log((err) => {
                'There was an error replying. "' +
                    __filename +
                    ', ' +
                    this.execute.name +
                    ' | Error: ' +
                    err.message
            })
        )*/
        // check for bumps
        // BlackListed words system here
        // exp system here (if no blacklisted words)
        // check for doxbin stuff posted here
        // invite link detector here
        // DB changes
        try {
            await client.db.memberMessageIncrement(message.guild, message.author);
        }
        catch (err) {
            console.log('ERROR! : ' + err);
        }
        // Loggings
    }
};
