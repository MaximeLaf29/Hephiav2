"use strict";
require('dotenv').config();
const Discord = require('discord.js');
const mongo = require('./mongo');
const dbAPI = require('./dbDiscordAPI.js');
const colors = require('colors');
const log = console.log.bind(console);
const { Collection, IntentsBitField } = require('discord.js');
const flags = IntentsBitField.Flags;
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
]);
const client = new Discord.Client({ intents });
const config = {
    developersID: [],
    creatorID: '',
    mongoDatabaseURL: process.env.DATABASE
};
module.exports = { client };
client.config = config;
client.reloading = false; // if the client is reloading
client.commands = new Collection(); // all the commands
client.subCommands = new Collection(); // all the sub commands
client.events = new Collection(); // all the events
client.guildConfigs = new Collection(); // All the guild's configs
// Connection to database
mongo(client.config.mongoDatabaseURL).then(() => log('🔗 The client is now connected to the database. 🔗'));
client.db = dbAPI; // Linking all the database API requests to the client object for easier access
log('Connected!'.green); // Test for the colors library
// Loading all the event handlers
const { loadEvents } = require('./Handlers/eventHandler');
loadEvents(client);
// We load all the guild's configs into the client object for easy access
const { loadGuildConfigs } = require('./Functions/configLoader.js');
loadGuildConfigs(client);
// # Config stuff removed from here so it's more clean
// --------- TEST ZONE -----------//
// -----------------------------
// Bot login
client.login(process.env.TOKEN);
