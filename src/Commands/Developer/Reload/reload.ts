import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

// Command that allow to reload the commands files or event handlers with each a sub command
const reloadCommand = {
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

export default reloadCommand
