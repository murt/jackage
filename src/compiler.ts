import {IJKGConfig} from "./config";

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

    public on(event: JKGCompilerEvent, callback: JKGCompilerEventHandler): JKGCompiler {
        if (!this.events.hasOwnProperty(event)) {
           this.events[event] = [];
        }

        this.events[event].push(callback);

        return this;
    }

    /**
     * Calls any available handlers registered for a compiler event.
     *
     * @param event The name of the event being dispatched.
     */
    private async dispatchEvent(event: JKGCompilerEvent) {
        for (const callback of (this.events[event] || [])) {
            await callback(event, this);
        }
    }
}

/**
 * Compiler events.
 */
export const enum JKGCompilerEvent {
    Starting = "starting",
    Started = "started",
    Log = "log",
}

/**
 * Compiler callbacks are assigned to events.
 */
export type JKGCompilerEventHandler = (event: JKGCompilerEvent, compiler: JKGCompiler) => void | Promise<void>;
