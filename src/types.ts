import JKGCompiler from "./compiler";

export declare const enum JKGLogLevel {
    Debug = "debug",
    Info = "info",
}

/**
 * Set of valid events that the compiler will dispatch event handling for.
 */
export declare const enum JKGCompilerEvent {

    /**
     * This event is dispatched whenever a log entry is published. By default Jackage is silent - listening for this
     * event is the only way get log messages out of the compiler and print them.
     */
    Log = "log",

    /**
     * The compiler has just called [[JKGCompiler.run]] - this event is dispatched quite literally before any other
     * functionality in the "run" function.
     */
    Starting = "starting",

    /**
     * The compiler is running, configuration has been validated, and all entry point source files have been gathered.
     * This event is dispatched immediately before any actual processing of source files occurs.
     */
    Started = "started",

}

/**
 * All compiler events have context.
 */
export declare interface IJKGCompilerEventContext {

    /**
     * The event being dispatched that generated this context.
     */
    event: JKGCompilerEvent;

    /**
     * Reference to the compiler instance that generated this context. This is also the preferred way of publishing
     * a log entry as [[JKGCompiler.log]] can be called on this object.
     */
    compiler: JKGCompiler;

}
