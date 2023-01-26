"use strict";
const guildConfigDatabase = require('../schemas/botconfig-schema');
/**
 * @classdesc Load all the guild configs from the database
 * @param {*} client
 * @returns
 */
async function loadGuildConfigs(client) {
    ;
    (await guildConfigDatabase.find()).forEach((guildConfigElement) => {
        client.guildConfigs.set(guildConfigElement.guildID, guildConfigElement);
    });
    return console.log('Guild Configs loaded to the client Collection.');
}
module.exports = { loadGuildConfigs };
