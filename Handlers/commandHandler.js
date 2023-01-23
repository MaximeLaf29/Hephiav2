async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader")
  const ascii = require("ascii-table")
  const table = new ascii().setHeading("Commands", "Status")

  await client.commands.clear()
  await client.subCommands.clear()

  let commandsArray = []

  const Files = await loadFiles("Commands")

  Files.forEach((file) => {
    //console.log(file)
    const command = require(file)

    // If the command file loaded has subcommand(s) inside it
    if (command.subCommand) {
      return client.subCommands.set(command.subCommand, command)
    }

    client.commands.set(command.data.name, command)

    commandsArray.push(command.data.toJSON())

    table.addRow(command.data.name, "🟩")
  })

  client.application.commands.set(commandsArray)

  return console.log(table.toString(), client.reloading ? "\nCommands Reloaded." : "\nCommands Loaded.")
}

module.exports = { loadCommands }
