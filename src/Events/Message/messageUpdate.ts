import { Event } from '../../Structures/Event'

export default new Event('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author?.bot) return

    console.log(
        `Mesage Updated : ${oldMessage.content}  ->  ${newMessage.content}`
    )
})
