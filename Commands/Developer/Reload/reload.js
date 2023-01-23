const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
  developer: false,
  creator: true,

  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload your commands/events.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName("commands").setDescription("Reload your Commands."))
    .addSubcommand((options) => options.setName("events").setDescription("Reload your Events."))
}
