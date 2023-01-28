import { Events } from 'discord.js'

type Event<T extends Events> = {
    rest?: boolean
    once?: boolean
    name: T
    // eslint-disable-next-line no-unused-vars
    listener: (...args: ClientEvents[T]) => Awaitable<void>
}
