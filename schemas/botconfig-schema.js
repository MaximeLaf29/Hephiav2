const mongoose = require('mongoose')

// This schema is useful for the bot in case it crashes and some users join and/or leave while the bot is down
// It can then use this list to update everything after comparing who is still in the server and who is gone.

// Basic Types
const zeroNumber = { type: Number, default: 0 }
const emptyString = { type: String, default: '' }
const reqString = { type: String, required: true }
const trueBool = { type: Boolean, default: true }
const falseBool = { type: Boolean, default: false }
// A new type for every component of the Discord logger module, since any component can be logged in a different place
const discordLoggerModuleType = {
    state: trueBool,
    channelToLog: emptyString
}

// A model by default of a message logging component
const discordLoggerModuleTypeMessage = {
    state: trueBool,
    defaultChannelToLog: emptyString
}

// Specially, roles can also be logged in another channel on top of being logged. It can also include a custom message you can setup
const loggerRoleSpecialMessage = {
    messageState: falseBool, // if the message in another channel should be used
    roleListForMessage: [
        {
            // array of role information
            roleId: emptyString, // the role target for a message
            messageChannel: emptyString, // where the message will be sent for that role
            message: emptyString // if this is empty then the default one will be used.
        }
    ]
}

// For special additional message when a user join or leave the server
const loggerJoinLeaveSpecialMessage = {
    messageState: falseBool, // if the message in another channel should be used
    messageChannel: emptyString, // where the message will be sent for that join/leave event
    message: emptyString // if this is empty then the default one will be used.
}

const loggerModerationSpecialMessage = {
    messageState: falseBool, // if the message in another channel should be used
    messageChannel: emptyString, // where the message will be sent for that moderation action
    message: emptyString // if this is empty then the default one will be used.
}

const loggerModerationType = {
    discordLoggerModuleType,
    loggerModerationSpecialMessage
}

const ticketType = {
    customID: emptyString, // a ID that identifies the ticket type in number: 000
    ticketName: emptyString, // The name of the ticket so we can recognize it
    isEnabled: trueBool, // whether this ticket type is enabled
    buttonText: emptyString, // The text that will be displayed on the button
    emoji: emptyString, // if not empty, should be a simple Emoji. 1 character long only accepted otherwise will be skipped
    buttonColor: emptyString, // See type of colors accepted
    ticketNamingType: zeroNumber, // 0 by default is going up in numbers
    ticketNamingScheme: emptyString, // How the ticket should be named. Multiple placeholder will be supported. See at the end.
    openingMessage: emptyString, // The message being sent in the ticket when it opens
    pingRole: falseBool, // switch whether or not roles will be pinged
    roleToPing: { type: [String], default: [] } // list of roles being pinged when a ticket is opened
}

const configBotSchema = mongoose.Schema({
    guildID: reqString, // the ID of the guild that owns these Datas
    discordLoggerModule: {
        // General Switch
        ModuleSwitchState: falseBool, // wether or not this module is used at all (so you can turn off all notifications)
        channelIDToLog: emptyString, // the ID of the channel where stuff is logged
        // Roles Logging
        roleAdd: {
            discordLoggerModuleType,
            loggerRoleSpecialMessage,
            defaultMessage: {
                type: String,
                default: 'User {USER} has received the {ROLE} role.'
            }
        },
        roleRemove: {
            discordLoggerModuleType,
            loggerRoleSpecialMessage,
            defaultMessage: {
                type: String,
                default: 'User {USER} lost the {ROLE} role.'
            }
        },
        roleCreate: discordLoggerModuleType,
        roleDelete: discordLoggerModuleType,
        roleEdit: discordLoggerModuleType,
        // Message Logging
        messageRemove: discordLoggerModuleTypeMessage, // Contains a default channel ID to log messages in case the channel is not used in a filter
        messageEdit: discordLoggerModuleTypeMessage,
        // User profile change Logging
        nicknameChange: discordLoggerModuleType,
        // [TODO] add discriminator change and picture change and more?
        usernameChange: discordLoggerModuleType,
        // Channel Logging
        channelChange: discordLoggerModuleType, // general switch for all channel logging events
        // [TODO] add channel edit, add, delete
        // Invite Link Detection Logging
        // add thread edit, add, delete
        inviteLink: { discordLoggerModuleType, inviteLinkStaff: falseBool }, // if we also detect links from staff
        // Members Joining/Leaving Logging
        join: {
            discordLoggerModuleType,
            loggerJoinLeaveSpecialMessage,
            defaultMessage: {
                type: String,
                default: '{USER} just JOINED the server.'
            }
        },
        leave: {
            discordLoggerModuleType,
            loggerJoinLeaveSpecialMessage,
            defaultMessage: {
                type: String,
                default: '{USER} just LEFT the server.'
            }
        },
        // Moderation Logging
        ban: {
            loggerModerationType,
            defaultMessage: {
                type: String,
                default: '{USER} was BANNED from the server.'
            }
        },
        unban: {
            loggerModerationType,
            defaultMessage: {
                type: String,
                default: '{USER} was UNBANNED from the server.'
            }
        },
        kick: {
            loggerModerationType,
            defaultMessage: {
                type: String,
                default: '{USER} was KICKED from the server.'
            }
        },
        timeout: {
            loggerModerationType,
            defaultMessage: {
                type: String,
                default: '{USER} was TIMED OUT for {TIME}.'
            }
        },
        joinInstaKick: discordLoggerModuleType,
        // test: trueBool,
        botConfig: {
            // Log on Discord when the bot's config has been changed (warning)
            state: falseBool,
            channelToLog: emptyString
        },
        botSelfLog: {
            // Either if you want the bot to log it's own events or not like messages and such
            state: falseBool,
            channelToLog: emptyString
        }

        // Down here will be all the other stuff we want to be able to log either now or in the future!
        //
        //
    },
    // Logging System here, so people can add as many 'loggin' type as they want, for X channels: log to X channel
    // This is ONLY for messages being edited or deleted
    // This requires Messages to be logged in the Logger system above
    // If a channel is NOT included in a filter, the default on in the above section will be used
    loggingSystem: {
        loggingBlacklistedChannelID: { type: [String], default: [] }, // Channels you don't want any logs to be done
        options: {
            // Each 'option' represent a set of channels to listen to and a channel to log message edits/removal to
            type: [
                {
                    loggingChannelID: emptyString, // Where to log the message edit or removal
                    loggingChannelName: emptyString, // Only for database better reading, name of the logging channel
                    loggingSwitch: falseBool, // Whether or not to use this filter for logging
                    listOfChannels: { type: [String], default: [] } // List of channels to listen to
                }
            ]
        }
    },
    serverLocked: falseBool, // If turned on, no one will be able to join the server
    whitelist: {
        ModuleSwitchState: falseBool, // Is this is set to FALSE, the whitelist will NOT be taken into consideration
        // If the server is locked, only those that are whitelist can get in
        userWhitelisted: { type: [String], default: [] }
    },
    joinLimitCount: zeroNumber,
    maxAutoKickForBan: zeroNumber,
    minimumOld: zeroNumber,
    minimumOldType: { type: String, default: 'mon' },
    autoGiveRolesOnJoin: {
        // List of roles to be given automatically upon joining the guild
        ModuleSwitchState: falseBool, // If we turn off the plugin to auto give role completely
        roleList: { type: [String], default: [] }
    },
    ticketSystem: {
        // Custom Ticket system to be done to replace TicketBot
        type: [ticketType],
        default: []
        // [TODO]
        // message autopost + switch
        // team?
        // multiple types of tickets
        // message #2 + switch
        //
    },
    moderationCommands: falseBool, // whether or not if the moderation commands are enabled for this server
    warningSystem: { type: [String], default: [] }, // [TODO] settings for the warning system
    rolePickingSystem: { type: [String], default: [] }, // [TODO] role Picking System
    roleAddingBackSystem: {
        // [TODO] system for giving back role on a user who came back
        // list of blacklisted role IDs to not give back + switch (true default) for ignoring role with server manage permissions
        type: [String],
        default: []
    },
    expSystem: {
        expTurnedOn: falseBool,
        multiplier: { type: Number, default: 1 },
        minimumCharacters: { type: Number, default: 3 },
        blackListChannel: { type: [String], default: [] },
        levelUpSentence: { type: [String], default: [] },
        levelDownSentence: { type: [String], default: [] },
        reminder: falseBool,
        reminderSentence: { type: [String], default: [] },
        levelAutoRole: {
            // Multiple roles can be given when certain level are reached
            type: [{ level: Number, role: [String] }],
            default: []
        }
    },
    autoDeleteSystem: {
        ModuleSwitchState: falseBool,
        entries: {
            type: [
                {
                    channelID: String,
                    channelName: String,
                    timeBeforeDelete: Number // time is in milliseconds (1 second = 1000 milliseconds)
                }
            ],
            default: []
        }
    },
    blackListWordSystem: {
        ModuleSwitchState: falseBool,
        listOfWords: { type: [String], default: [] },
        alertMention: falseBool,
        alertMentionRoles: { type: [String], default: [] },
        channelToLog: emptyString
    },
    greetingSystem: {
        ModuleSwitchState: falseBool,
        greetingSentences: { type: [String], default: [] },
        triggers: {
            gettingRole: [String],
            onRoleGet: falseBool,
            onJoin: falseBool
        },
        channelToSend: emptyString
    },
    serverStatsSystem: {
        // $user = number of user in the server // $online = number of member online in the server
        // $boost  $boosters  $role  $roleList  // A specific role or list of roles can be used to show a statistic
        ModuleSwitchState: falseBool,
        entry: {
            type: [
                {
                    statText: {
                        type: String, // You could write something like "User: $user | Online: $online"
                        maxLength: 50
                    },
                    role: [String] // if $role then only the first item will be used, if $rolelist then all roles will be taken into account
                }
            ]
        }
    },
    promotionSystem: {
        // This system will be used to manage promotion of members
        // type of position with identifier
        // role(s) associated with a promotion
        // date for a promotion
        // description of each type of promotion
        // promotion or demotion logs
        // in the logs we have a new entry whenever someone received a promotion or a demotion
        // each entry have infos about the member targeted, the date and old + new type of position (so we know what happened)
        // [TODO] later
    }
})

module.exports = mongoose.model('guildbotconfig', configBotSchema)

/*  ticketNamingScheme ----
For ticketNamingScheme you can use multiple placeholder names different.
Here is a starting list of available scheme:

%username% = the username of the user who opened this ticket
%nickname% = the nickname of the user who opened this ticket
%userid% = the id of the user who opened this ticket
%usernametag% = the username and tag of the user who opened this ticket

// ticketNamingType ------

Type 0: The ticket will use the naming scheme: "ticket-0000" where "0000" is the number of the ticket that was opened
Type 1: Custom naming scheme, see above for more.

// buttonColor -------

Colors accepted for this type:
Blue
Green
Grey (link)
Red
//  -------------
*/
