const { Message, MessageEmbed } = require("discord.js")
const fileContext = "Events/Client/Message/messageDelete.js, execute()"

// Message deleted event handler
module.exports = {
  name: "messageDelete",
  /**
   *
   * @param {Message} message
   * @param {client} client
   */
  execute(message, client) {
    console.log(message)
  }
}
