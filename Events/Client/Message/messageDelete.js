const { Message, MessageEmbed } = require("discord.js")
const { loadCommands } = require("../../../Handlers/commandHandler")
Message
module.exports = {
  name: "messageDelete",
  /**
   *
   * @param {Message} oldMessage
   * @param {Message} newMessage
   * @param {client} client
   */
  execute(oldMessage, newMessage, client) {
    console.log(oldMessage)
  }
}
