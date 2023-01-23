var util = require("util")
const fs = require("fs")
const editJsonFile = require("edit-json-file")
const axios = require("axios")
require("dotenv").config()
const Discord = require("discord.js")
const mongo = require("./mongo")
const userSchema = require("./schemas/user-schema")
const configBotSchema = require("./schemas/botconfig-schema")
const dbAPI = require("./dbDiscordAPI.js")

const {
  Client,
  Intents,
  Partials,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageEmbed,
  GatewayIntentBits,
  Collection
} = require("discord.js")
const intents = new Discord.IntentsBitField([
  Discord.IntentsBitField.Flags.Guilds,
  Discord.IntentsBitField.Flags.GuildMembers,
  Discord.IntentsBitField.Flags.GuildMessages,
  Discord.IntentsBitField.Flags.GuildPresences,
  Discord.IntentsBitField.Flags.GuildMessageReactions,
  Discord.IntentsBitField.Flags.MessageContent,
  Discord.IntentsBitField.Flags.GuildMessageTyping,
  Discord.IntentsBitField.Flags.GuildInvites,
  Discord.IntentsBitField.Flags.GuildScheduledEvents
])

const client = new Discord.Client({
  intents
})

const { loadEvents } = require("./Handlers/eventHandler")
const { log } = require("console")

module.exports = { client }
client.config = require("./config.json")
client.reloading = false
client.commands = new Collection()
client.subCommands = new Collection()
client.events = new Collection()

loadEvents(client)

// When bot turn on //
client.on("ready", async () => {
  console.log(`--------- Logged in as ${client.user.tag}! ---------\nReady!`)

  client.saveconfig()
})

//Function to save the current config to the config file on disk
client.saveconfig = async function () {
  try {
    await fs.writeFileSync("config.json", JSON.stringify(client.config), utf8)
    console.log("Config saved successfully.")
  } catch (err) {
    console.log("Error saving config: " + err)
  } finally {
    await client.loadconfig()
    console.log("Config reloaded.")
  }
}

// Function to load the current config in case of error or to simply refresh
client.loadconfig = async function () {
  try {
    client.config = await JSON.parse(fs.readFileSync("./config.json"))
    console.log("Config file Loaded successfully.")
  } catch (err) {
    console.log("Error loading config file: " + err)
  } finally {
    console.log("Config Loaded:")
    console.log(client.config)
  }
  // client.config = require(fileName)
}

// Bot login
client.login(process.env.TOKEN)
