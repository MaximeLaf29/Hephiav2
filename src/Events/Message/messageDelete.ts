import { Event } from '../../Structures/Event'

export default new Event('messageDelete', (message) => {
    if (message.author?.bot) return

    console.log(`Mesage Deleted : ${message.content}`)
})
