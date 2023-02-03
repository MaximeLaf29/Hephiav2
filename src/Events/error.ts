import { Event } from '../Structures/Event'

export default new Event('error', (error) => {
    console.log(`An error occurred! -> ${error}`)
})
