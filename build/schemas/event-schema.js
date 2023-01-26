"use strict";
const mongoose = require('mongoose');
// Basic Types
const zeroNumber = { type: Number, default: 0 };
const emptyString = { type: String, default: '' };
const reqString = { type: String, required: true };
const trueBool = { type: Boolean, default: true };
const falseBool = { type: Boolean, default: false };
// infos about a single world
const worldInfos = {
    worldID: reqString,
    worldName: emptyString,
    worldDescription: emptyString,
    worldCapacity: zeroNumber,
    levelPhotoSensitivity: zeroNumber,
    hasVideoPlayer: falseBool,
    hasAudioLink: falseBool,
    isCurrentlyAccepted: trueBool,
    numberOfTimeUsed: zeroNumber,
    listOfSpecialCommentsAboutWorld: {
        type: [worldSpecialComments],
        default: []
    } // A list of all comments we possibly want to leave about the world
};
// The information for every comments about the world
const worldSpecialComments = {
    userID: reqString,
    comment: emptyString,
    date: emptyString // the date in Epoch this comment was written
};
// All the information concerning one event
const eventInfos = {
    eventType: emptyString,
    date: emptyString,
    hostUserID: emptyString,
    worldIDChosen: emptyString,
    eventRating: zeroNumber,
    eventRatingList: { type: [eventRatingModel], default: [] } // the list of all the rating received with comments
};
// The model of a event rating
const eventRatingModel = {
    isAnonym: falseBool,
    userID: emptyString,
    userName: emptyString,
    ratingGiven: zeroNumber,
    specialComment: emptyString,
    date: emptyString // the date that the user submitted the review in Epoch
};
// A list of event type that can be saved so description of an event don't need to be written again
const eventTypeModel = {
    eventName: emptyString,
    eventDescription: emptyString // the description of the event
};
// All the information about the event team members
const eventMemberInfos = {
    userID: emptyString,
    datePromotion: emptyString,
    isTrial: trueBool,
    isInFonction: trueBool,
    dateDemotion: emptyString,
    positionType: zeroNumber,
    complaints: { type: [eventMemberComplaint], default: [] } // list of complaints about that host
};
// model of a complaint against a host
const eventMemberComplaint = {
    userIDAgainst: emptyString,
    userIDfilled: emptyString,
    notes: emptyString,
    date: emptyString // the date the complaint was filled
};
// A list of the event team members types. 0 = host and 1 = security (more can be added in the future)
const eventMemberType = {
    typeNumber: zeroNumber,
    positionTitle: reqString,
    positionDescription: emptyString // the description of the position
};
// The main model that will be saved
const eventSchema = mongoose.Schema({
    guildID: reqString,
    managerList: { type: [emptyString], default: [] },
    listOfWorlds: { type: [worldInfos], default: [] },
    eventType: { type: [eventTypeModel], default: [] },
    listOfEvents: { type: [eventInfos], default: [] },
    hostRoleID: reqString,
    listOfEventTeamMembers: { type: [eventMemberInfos], default: [] },
    eventMemberTypes: { type: [eventMemberType], default: [] } // The full list of event member types
});
module.exports = mongoose.model('events', eventSchema);
