import React from "react";
import { Playthrough as PlaythroughClass, ConnectionStatus, SpeechRecognitionResponse, SpeechRecognitionStarted, SpeechRecognitionStopped } from "@charisma-ai/sdk";
export interface UsePlaythroughOptions {
    playthroughToken?: string;
    charismaUrl?: string;
    autoconnect?: boolean;
    onConnectionStatus?: (connectionStatus: ConnectionStatus) => void;
    onError?: (error: any) => void;
    onProblem?: (problem: {
        code: string;
        error: string;
    }) => void;
    onSpeechRecognitionResponse?: (response: SpeechRecognitionResponse) => void;
    onSpeechRecognitionStarted?: (data: SpeechRecognitionStarted) => void;
    onSpeechRecognitionStopped?: (data: SpeechRecognitionStopped) => void;
}
export declare const usePlaythrough: ({ playthroughToken, charismaUrl, autoconnect, onConnectionStatus, onError, onProblem, onSpeechRecognitionResponse, onSpeechRecognitionStarted, onSpeechRecognitionStopped, }: UsePlaythroughOptions) => {
    connectionStatus: ConnectionStatus;
    playthrough: PlaythroughClass | undefined;
    playthroughToken: string | undefined;
};
export interface PlaythroughProps extends UsePlaythroughOptions {
    children: React.ReactNode | ((playthrough?: ReturnType<typeof usePlaythrough>) => React.ReactNode);
}
export declare const Playthrough: ({ children, ...props }: PlaythroughProps) => React.JSX.Element;
