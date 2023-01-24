const { UUID } = require('bson')
const mongoose = require('mongoose')

// --- This is the new Data Type that will be saved for each users --- //

// Basic Types
const zeroNumber = { type: Number, default: 0 }
const emptyString = { type: String, default: '' }
const reqString = { type: String, required: true }
const trueBool = { type: Boolean, default: true }
const falseBool = { type: Boolean, default: false }

// Message infos to be logged
const messageLogger = {
    id: reqString, // the message ID of the message
    link: reqString, // the link to the message
    postDateISO: emptyString, // the date the message was posted in ISO
    postDateEpoch: emptyString // the date the message was posted in epoch
}

// Model of a message being logged
const defMessageLogger = { type: [messageLogger], default: [] } // array of infos about messages

// Warning infos for each warning to be logged
const serverWarningInfos = {
    type: emptyString, // The type of the warning IF there is one
    custom: emptyString, // If the type isn't used and a custom warning is given
    executerID: reqString, // Who gave the warning
    reason: reqString, // The reason of the warning
    date: emptyString, // The date of the warning
    acknowledge: falseBool, // Whether the warning is acknowledge by the user
    acknowledgeDate: emptyString, // The reason of the warning acknowledge
    info: emptyString, // The information about the warning if there is more (optionnal)
    channelIDContest: emptyString // The channel ID of the channel that contains the warning contested IF user don't agree with this warning
}

const serverNonWarningInfos = {
    title: emptyString, // The title of that non warning
    executerID: reqString, // who took note this non warning
    date: emptyString, // The date of the non warning
    info: emptyString // The information about the non warning if there is more (optionnal)
}

// Warning Type to be logged
const serverWarningInfo = {
    officialWarningCount: zeroNumber, // The amount of Official warning the user received
    informalWarningCount: zeroNumber, // The amount of Informate warning the user received
    nonWarningCount: zeroNumber, // The amount of Non Warning warning the user received (action taken by staff which the user didn't get any official or informal warning for log purposes)
    timeoutCount: zeroNumber, // The amount of time the user was timedout
    officialWarningList: { type: [serverWarningInfos], default: [] }, // The list of all the Official warning the user received
    informalWarningList: { type: [serverWarningInfos], default: [] }, // The list of all the Informate warning the user received
    nonWarningList: { type: [serverNonWarningInfos], default: [] } // The list of all the non warning the user received
}

const eventAttendenceInfos = {
    eventID: emptyString, // Unique identifier of the event (will most likely be 4 first digits of userID of the host + the full epoch time of the event)
    eventType: emptyString, // the type of that event
    eventDate: emptyString, // string of the date of the event in epoch milliseconds
    eventHostUserId: emptyString, // the userID of the host that hosted that event
    ratingGiven: { type: Number, max: 10, min: 1 } // the rating this user left for that event
}

const VREvents = {
    eventAttended: zeroNumber, // the number of times this user has been to an event
    isEventBanned: falseBool, // boolean, if this user is banned or not from attending events
    attendedEvents: { type: [eventAttendenceInfos], default: [] } // Array of all the events this user attended to
}

const eventWarningInfos = {
    warningTitle: emptyString, // the title of the warning the user has received
    warningDescription: emptyString, // the description of the warning that occurred
    warningDate: emptyString, // the date of this warning
    punishmentReceived: emptyString, // Description of the punishment that this user has received
    eventID: emptyString, // The unique identifier for this event that the user has been warned in
    warningExecutorID: reqString // The ID of the user/staff who pushed the punishment and filled this warning
}

// Event Warning system, split the warning category into 2: Server and Event side.
const eventWarningInfo = {
    numberOfWarnings: zeroNumber, // the number of warnings this user has received for events
    isOnWatchList: falseBool, // boolean, if this user is on the watch list
    officialWarningList: { type: [eventWarningInfos], default: [] } // Array containing all past event warning on record
}

const memberLeavingModel = {
    leaveType: zeroNumber, // the type of leave this user has. 0 = normal leave, 1 = kicked, 2 = banned
    date: emptyString, // date in Epoch the user left the server
    reason: emptyString, // any reason the user left. Is blank if type = 0
    executerID: emptyString // the user ID of the executer of the kick/ban, if type != 0 only
}

const userSchema = mongoose.Schema({
    guildID: reqString, // The ID of the guild that this user belongs to (REQUIRED)
    userID: reqString, // The ID of this user (REQUIRED)
    discordUsername: emptyString, // The current or last recorded Username of the user
    discordUsernameHistory: { type: [emptyString], default: [] }, // List of username the user had
    discordTag: emptyString, // The current or last recorded Discriminator (tag) of the user
    discordTagHistory: { type: [emptyString], default: [] }, // List of Tag the user had
    discordNickname: emptyString, // The current or last recorded nickname of the user
    discordNicknameHistory: { type: [emptyString], default: [] }, // List of nickname the user used in the past
    autoKickCount: zeroNumber, // The amount of time the user was auto kicked
    joinCount: { type: Number, default: 1 }, // The amount of time the user joined the server
    joinDates: { type: [emptyString], default: [] }, // List of date the user Joined the Discord server in Epoch
    LeaveData: { type: [memberLeavingModel], default: [] }, // List of infos about the user who Left the Discord server with date in Epoch
    isGone: falseBool, // If the user is currently gone from the server or not. if false then the member is in the server
    roles: { type: [emptyString], default: [] }, // Array listing all the current roles the user has
    verifiedDate: emptyString, // The date the user has been verified in epoch format
    verifiedTicketChannelId: emptyString, // The ID of the channel/thread for the ticket where this user was verified
    messageIdList: {
        lookingForPet: defMessageLogger, // List of messages that have been sent to this specific channel
        lookingForMaster: defMessageLogger, // List of messages that have been sent to this specific channel
        vrcName: defMessageLogger, // List of messages that have been sent to this specific channel
        lovenseName: defMessageLogger, // List of messages that have been sent to this specific channel
        quickErp: defMessageLogger, // List of messages that have been sent to this specific channel
        lookingForCuddle: defMessageLogger, // List of messages that have been sent to this specific channel
        lookingFor: defMessageLogger, // List of messages that have been sent to this specific channel
        nsfwBios: defMessageLogger // List of messages that have been sent to this specific channel
    },
    warnings: {
        serverWarnings: serverWarningInfo, // All the infos related to Server Warnings for that user
        eventWarnings: eventWarningInfo // All the infos related to Event Warnings for that user
    },
    event: VREvents, // All the infos regarding Events and attendance for this user
    vrcName: emptyString, // VRChat's current username
    vrcNameHistory: { type: [emptyString], default: [] }, // The history of VRChat's username for this user
    vrcUserId: emptyString, // The current user ID for this user for VRChat
    currentEXP: { type: Number, min: 0, default: 0 }, // Current total EXP this user has in the server
    hornyPoints: { type: Number, min: 0, default: 0 }, // Current total HornyPoints this user has in the server
    numberOfMessagesSent: zeroNumber // Number of messages sent in the server
    // blabla: emptyString
})

module.exports = mongoose.model('users', userSchema)
