import { Events, Message } from 'discord.js'
import { Event } from '../../../types/Event'

const messageUpdate: Event<Events.MessageUpdate> = {
    name: Events.MessageUpdate,
    listener: async (oldMessage: Message, newMessage: Message) => {
        if (oldMessage.author.bot) return

        console.log(
            'Mesage Updated : ' +
                oldMessage.content +
                '  ->  ' +
                newMessage.content
        )
    }
}

export default messageUpdate
