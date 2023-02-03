import { Event } from '../../Structures/Event'

export default new Event('messageCreate', (message) => {
    if (message.author.bot) return

    message
        .reply('hahah!')
        .catch((err) =>
            console.log(
                `There was an error replying. "${__filename},  | Error: ${err.message}`
            )
        )
})
