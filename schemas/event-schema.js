const mongoose = require('mongoose')

// Basic Types
const zeroNumber = { type: Number, default: 0 }
const emptyString = { type: String, default: '' }
const reqString = { type: String, required: true }
const trueBool = { type: Boolean, default: true }
const falseBool = { type: Boolean, default: false }

// infos about a single world
const worldInfos = {
    worldID: reqString, // the ID of the world
    worldName: emptyString, // the name of the world
    worldDescription: emptyString, // the description of the world
    worldCapacity: zeroNumber, // the capacity of the world (How much players can get in the world)
    levelPhotoSensitivity: zeroNumber, // from 0 to 10. 0 being without any flashing lights and 10 being with a lot of light flashes
    hasVideoPlayer: falseBool, // whether the world has a video player or not
    hasAudioLink: falseBool, // whether the world has AudioLink or not
    isCurrentlyAccepted: trueBool, // whether we currently accept this world for events
    numberOfTimeUsed: zeroNumber, // Number of time this world was used for events (unsure yet if this will be used!)
    listOfSpecialCommentsAboutWorld: {
        type: [worldSpecialComments],
        default: [],
    }, // A list of all comments we possibly want to leave about the world
}

// The information for every comments about the world
const worldSpecialComments = {
    userID: reqString, // the userID of the user who wrote that comment
    comment: emptyString, // the comment that was written
    date: emptyString, // the date in Epoch this comment was written
}

// All the information concerning one event
const eventInfos = {
    eventType: emptyString, // The type (or title) of that event
    date: emptyString, // the date the event occured in Epoch time
    hostUserID: emptyString, // the Discord User ID of the Host of that event
    worldIDChosen: emptyString, // the ID of the world chosen for that event
    eventRating: zeroNumber, // the average rating that event received (will update in real time)
    eventRatingList: { type: [eventRatingModel], default: [] }, // the list of all the rating received with comments
}

// The model of a event rating
const eventRatingModel = {
    isAnonym: falseBool, // if true then username will be blank, if false show the username instead
    userID: emptyString, // the Discord User ID of the person who submitted the review (will be empty if anonym is true)
    userName: emptyString, // the name of the user who submitted the review (will be empty if anonym is true)
    ratingGiven: zeroNumber, // the rating that the user submitted
    specialComment: emptyString, // any special comment that was submitted with the review
    date: emptyString, // the date that the user submitted the review in Epoch
}

// A list of event type that can be saved so description of an event don't need to be written again
const eventTypeModel = {
    eventName: emptyString, // the name of the event (title)
    eventDescription: emptyString, // the description of the event
}

// All the information about the event team members
const eventMemberInfos = {
    userID: emptyString, // the user ID of the host user
    datePromotion: emptyString, // the date that the user became a host in epoch
    isTrial: trueBool, // whether the user is a trial host or not
    isInFonction: trueBool, // whether or not this host is currently part of the team
    dateDemotion: emptyString, // the date that the user was promoted to the host team in epoch
    positionType: zeroNumber, // the position type of the event member. 0 = host, 1 = security (more can be added in the future)
    complaints: { type: [eventMemberComplaint], default: [] }, // list of complaints about that host
}

// model of a complaint against a host
const eventMemberComplaint = {
    userIDAgainst: emptyString, // the user ID of the user that received a complaint against
    userIDfilled: emptyString, // the user ID of the user who submitted the complaint
    notes: emptyString, // note about that complaint
    date: emptyString, // the date the complaint was filled
}

// A list of the event team members types. 0 = host and 1 = security (more can be added in the future)
const eventMemberType = {
    typeNumber: zeroNumber, // The ID of the event team type member
    positionTitle: reqString, // the name of the position
    positionDescription: emptyString, // the description of the position
}

// The main model that will be saved
const eventSchema = mongoose.Schema({
    guildID: reqString, // The Guild ID this config is for (in case multiple server want to use it)
    managerList: { type: [emptyString], default: [] }, // list of user IDs that can manage the team
    listOfWorlds: { type: [worldInfos], default: [] }, // the list of world information
    eventType: { type: [eventTypeModel], default: [] }, // List of different type of event with their description
    listOfEvents: { type: [eventInfos], default: [] }, // The full list of events that has happened or will happen
    hostRoleID: reqString, // the ID of the host role this config is for (need) (in case multiple server use it) Is required for ↓↓
    listOfEventTeamMembers: { type: [eventMemberInfos], default: [] }, // The full list of event team members
    eventMemberTypes: { type: [eventMemberType], default: [] }, // The full list of event member types
})

module.exports = mongoose.model('events', eventSchema)
