import {IJKGConfig} from "./config";
import {IJKGCompilerEventContext, JKGCompilerEvent, JKGLogLevel} from "./types";

/**
 * Primary class for compilation. This is the main type to instantiate
 * and bundle your resources with.
 */
export default class JKGCompiler {

    public config: IJKGConfig;

    private events: { [key: string]: JKGCompilerEventHandler[] };

    constructor(config: IJKGConfig) {
        this.config = config;
        this.events = {};
    }

    public async run() {
        try {
            // Dispatch the starting event at the earliest possible point
            await this.dispatchEvent(JKGCompilerEvent.Starting);

            // Inspect and validate the configuration

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Listen for events that are dispatched by the compiler instance.
     *
     * @param event The name of the event to listen for.
     * @param callback Callback function that will be added to the list of handlers for this event.
     */
    public on(event: JKGCompilerEvent, callback: JKGCompilerEventHandler): JKGCompiler {
        if (!this.events.hasOwnProperty(event)) {
           this.events[event] = [];
        }

        this.events[event].push(callback);

        return this;
    }

    /**
     * Logs a message via the compiler's event system. Note that this is technically an asynchronous function as
     * the event pipeline is async, in practice however the logging functionality should be considered fire and
     * forget. It is suggested that you "await" this function though if you are inside an "ansync" function just
     * for the sake of consistency.
     *
     * @param level The level that this message will be logged at.
     * @param message The content of the message to log.
     */
    public async log(level: JKGLogLevel, message: string) {
        await this.dispatchEvent(JKGCompilerEvent.Log, { level, message });
    }

    /**
     * Calls any available handlers registered for a compiler event.
     *
     * @param event The name of the event being dispatched.
     */
    private async dispatchEvent(event: JKGCompilerEvent, context: any = {}) {
        if (this.events.hasOwnProperty(event) && this.events[event].length) {
            const data = {event, compiler: this, ...context};
            for (const callback of this.events[event]) {
                await callback(data);
            }
        }
    }
}

/**
 * Compiler callbacks are assigned to events.
 */
export type JKGCompilerEventHandler = (context: IJKGCompilerEventContext) => void | Promise<void>;
