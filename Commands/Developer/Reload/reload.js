const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const fileContext = 'Commands/Developer/Reload/reload.js, execute()'

// Command that allow to reload the commands files or event handlers with each a sub command
module.exports = {
    developer: false,
    creator: true,

    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload your commands/events.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((options) =>
            options.setName('commands').setDescription('Reload your Commands.')
        )
        .addSubcommand((options) =>
            options.setName('events').setDescription('Reload your Events.')
        )
}
