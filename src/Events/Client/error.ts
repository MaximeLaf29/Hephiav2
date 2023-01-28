import { Events } from 'discord.js'
import { Event } from '../../types/Event'

// Event Listener for error events
const error: Event<Events.Error> = {
    name: Events.Error,
    listener: async (error: Events.Error) => {
        console.log('An error occurred! -> ' + error)
    }
}

export default error
