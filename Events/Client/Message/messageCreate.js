const { Message, MessageEmbed } = require("discord.js")
const { loadCommands } = require("../../../Handlers/commandHandler")
const dbAPI = require("../../../dbDiscordAPI.js")
Message
module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {client} client
   */
  async execute(message, client) {
    if (message.author.bot) return

    // Actions
    console.log(message.content)
    message.reply("hahah!")
    // check for bumps
    // BlackListed words system here
    // exp system here (if no blacklisted words)
    // check for doxbin stuff posted here
    // invite link detector here
    // DB changes
    try {
      await dbAPI.memberMessageIncrement(message.guild, message.author)
    } catch (err) {
      console.log("ERROR! : " + err)
    }
    // Loggings
  }
}
