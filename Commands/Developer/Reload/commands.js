const { ChatInputCommandInteraction, Client } = require("discord.js")
const { loadCommands } = require("../../../Handlers/commandHandler")
const fileContext = "Commands/Developer/Reload/commands.js, execute()"

module.exports = {
  subCommand: "reload.commands",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    client.reloading = true
    loadCommands(client)
    interaction.reply({ content: "Reloaded Commands", ephemeral: true }).catch((err) => {
      console.log("Can't reply to interaction! " + fileContext)
    })
  }
}
