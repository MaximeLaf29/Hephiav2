const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const fileContext = "Commands/Public/ping.js, execute()"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Will Reply with Pong.")
    .setDMPermission(false)
    .addIntegerOption((options) => options.setName("howmuch").setDescription("Enter how much pong you want. (2-4)").setMinValue(2).setMaxValue(4)),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    var msg = "Pong! "
    let numberPong = interaction.options.getInteger("howmuch")
    if (numberPong) {
      for (var i = 0; i < numberPong - 1; i++) {
        msg += "Pong! "
      }
    }

    interaction
      .reply({
        content: msg,
        ephemeral: true
      })
      .catch((err) => {
        console.log("Can't reply to Interaction! " + fileContext)
      })
  }
}
