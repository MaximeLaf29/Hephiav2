"use strict";
const mongoose = require('mongoose');
// --- This is the new Data Type that will be saved for each users --- //
// Basic Types
const zeroNumber = { type: Number, default: 0 };
const emptyString = { type: String, default: '' };
const reqString = { type: String, required: true };
// const trueBool = { type: Boolean, default: true }
const falseBool = { type: Boolean, default: false };
// Message infos to be logged
const messageLogger = {
    id: reqString,
    link: reqString,
    postDateISO: emptyString,
    postDateEpoch: emptyString // the date the message was posted in epoch
};
// Model of a message being logged
const defMessageLogger = { type: [messageLogger], default: [] }; // array of infos about messages
// Warning infos for each warning to be logged
const serverWarningInfos = {
    type: emptyString,
    custom: emptyString,
    executerID: reqString,
    reason: reqString,
    date: emptyString,
    acknowledge: falseBool,
    acknowledgeDate: emptyString,
    info: emptyString,
    channelIDContest: emptyString // The channel ID of the channel that contains the warning contested IF user don't agree with this warning
};
const serverNonWarningInfos = {
    title: emptyString,
    executerID: reqString,
    date: emptyString,
    info: emptyString // The information about the non warning if there is more (optionnal)
};
// Warning Type to be logged
const serverWarningInfo = {
    officialWarningCount: zeroNumber,
    informalWarningCount: zeroNumber,
    nonWarningCount: zeroNumber,
    timeoutCount: zeroNumber,
    officialWarningList: { type: [serverWarningInfos], default: [] },
    informalWarningList: { type: [serverWarningInfos], default: [] },
    nonWarningList: { type: [serverNonWarningInfos], default: [] } // The list of all the non warning the user received
};
const eventAttendenceInfos = {
    eventID: emptyString,
    eventType: emptyString,
    eventDate: emptyString,
    eventHostUserId: emptyString,
    ratingGiven: { type: Number, max: 10, min: 1 } // the rating this user left for that event
};
const VREvents = {
    eventAttended: zeroNumber,
    isEventBanned: falseBool,
    attendedEvents: { type: [eventAttendenceInfos], default: [] } // Array of all the events this user attended to
};
const eventWarningInfos = {
    warningTitle: emptyString,
    warningDescription: emptyString,
    warningDate: emptyString,
    punishmentReceived: emptyString,
    eventID: emptyString,
    warningExecutorID: reqString // The ID of the user/staff who pushed the punishment and filled this warning
};
// Event Warning system, split the warning category into 2: Server and Event side.
const eventWarningInfo = {
    numberOfWarnings: zeroNumber,
    isOnWatchList: falseBool,
    officialWarningList: { type: [eventWarningInfos], default: [] } // Array containing all past event warning on record
};
const memberLeavingModel = {
    leaveType: zeroNumber,
    date: emptyString,
    reason: emptyString,
    executerID: emptyString // the user ID of the executer of the kick/ban, if type != 0 only
};
const userSchema = mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    discordUsername: emptyString,
    discordUsernameHistory: { type: [emptyString], default: [] },
    discordTag: emptyString,
    discordTagHistory: { type: [emptyString], default: [] },
    discordNickname: emptyString,
    discordNicknameHistory: { type: [emptyString], default: [] },
    autoKickCount: zeroNumber,
    joinCount: { type: Number, default: 1 },
    joinDates: { type: [emptyString], default: [] },
    LeaveData: { type: [memberLeavingModel], default: [] },
    isGone: falseBool,
    roles: { type: [emptyString], default: [] },
    verifiedDate: emptyString,
    verifiedTicketChannelId: emptyString,
    messageIdList: {
        lookingForPet: defMessageLogger,
        lookingForMaster: defMessageLogger,
        vrcName: defMessageLogger,
        lovenseName: defMessageLogger,
        quickErp: defMessageLogger,
        lookingForCuddle: defMessageLogger,
        lookingFor: defMessageLogger,
        nsfwBios: defMessageLogger // List of messages that have been sent to this specific channel
    },
    warnings: {
        serverWarnings: serverWarningInfo,
        eventWarnings: eventWarningInfo // All the infos related to Event Warnings for that user
    },
    event: VREvents,
    vrcName: emptyString,
    vrcNameHistory: { type: [emptyString], default: [] },
    vrcUserId: emptyString,
    currentEXP: { type: Number, min: 0, default: 0 },
    hornyPoints: { type: Number, min: 0, default: 0 },
    numberOfMessagesSent: zeroNumber // Number of messages sent in the server
    // blabla: emptyString
});
module.exports = mongoose.model('users', userSchema);
