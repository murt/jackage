/**
 * Configures a Jackage compiler instance.
 */
export interface IJKGConfig {

    targets: IJKGTarget[];

}

/**
 * Describes an output target and the rules for generating it.
 */
export interface IJKGTarget {

    /**
     * File to begin compiling from.
     */
    entry: string;

    /**
     * Whether or not warnings are fatal. While errors are always considered fatal
     */
    fatalWarnings: boolean;

}

/**
 * Describes a pipe function.
 */
export type IJKGPipe = (source: string, config: any, context: IJKGPipeContext) => string;

/**
 * The context provided to each invokation of a pipe function.
 */
export interface IJKGPipeContext {

    /**
     * The file currently being loaded.
     */
    file: string;

    /**
     * Whether or not this pipe has been configured to be deferred until after explicit pipes.
     */
    deferred: boolean;

    /**
     * The list of pipes this file will be affected by, including this pipe.
     */
    pipes: string[];

}
