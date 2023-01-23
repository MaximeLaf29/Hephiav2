const { loadCommands } = require("../../Handlers/commandHandler")
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("The Client is now ready.")
    loadCommands(client)
    // At this point, the bot should check if each Guild it's in has a proper config in the DB!
  }
}
