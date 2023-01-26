import * as dotenv from 'dotenv'
dotenv.config()

import Discord from 'discord.js'
import mongo from './mongo'
import dbAPI from './dbDiscordAPI.js'
import DiscordBot from './Client/discordBot'

import { IntentsBitField } from 'discord.js'

const flags = IntentsBitField.Flags
const intents = new Discord.IntentsBitField([
    flags.Guilds,
    flags.GuildMembers,
    flags.GuildMessages,
    flags.GuildPresences,
    flags.GuildMessageReactions,
    flags.MessageContent,
    flags.GuildMessageTyping,
    flags.GuildInvites,
    flags.GuildScheduledEvents
])

const client = new DiscordBot({ intents })

// Connection to database
mongo(process.env.DATABASE).then(() =>
    console.log('🔗 The client is now connected to the database. 🔗')
)
client.db = dbAPI // TODO: Change this motherfucker to Prisma (https://www.prisma.io).
console.log('Connected!') // Test for the colors library

// Loading all the event handlers
import loadEvents from './Handlers/eventHandler'
loadEvents(client)

// We load all the guild's configs into the client object for easy access
import { loadGuildConfigs } from './Functions/configLoader.js'
loadGuildConfigs(client)

// # Config stuff removed from here so it's more clean
// --------- TEST ZONE -----------//

// -----------------------------

// Bot login
client.login(process.env.TOKEN)

export default client
