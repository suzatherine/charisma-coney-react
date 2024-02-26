/// <reference types="react" />
import { Playthrough, ConnectionStatus } from "@charisma-ai/sdk";
export type PlaythroughContextType = {
    connectionStatus: ConnectionStatus;
    playthrough: Playthrough | undefined;
    playthroughToken: string | undefined;
};
export declare const PlaythroughContext: import("react").Context<PlaythroughContextType | undefined>;
export declare const PlaythroughProvider: import("react").Provider<PlaythroughContextType | undefined>;
export declare const PlaythroughConsumer: import("react").Consumer<PlaythroughContextType | undefined>;
export declare const usePlaythroughContext: () => PlaythroughContextType | undefined;
