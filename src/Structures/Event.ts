import { ClientEvents } from 'discord.js'

export class Event<Key extends keyof ClientEvents> {
    constructor(
        // eslint-disable-next-line no-unused-vars
        public event: Key,
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
        public run: (...args: ClientEvents[Key]) => any
    ) {}
}
