import React, { ReactNode } from "react";
import { Conversation as ConversationType, MessageEvent, StartTypingEvent, StopTypingEvent, EpisodeCompleteEvent, Message, StartEvent, ReplyEvent, SpeechConfig, ActionEvent, ProblemEvent } from "@charisma-ai/sdk";
export declare enum ChatMode {
    Tap = "tap",
    Chat = "chat"
}
export type PlayerMessage = {
    type: "player";
    timestamp: number;
    message: {
        text: string;
    };
};
export type StoredMessage = Message | PlayerMessage;
export interface ConversationChildProps {
    inputValue: string;
    isRestarting: boolean;
    isTyping: boolean;
    messages: StoredMessage[];
    mode: ChatMode;
    type: (newInputValue: string) => void;
    start: ConversationType["start"];
    reply: ConversationType["reply"];
    tap: ConversationType["tap"];
    action: ConversationType["action"];
    resume: ConversationType["resume"];
    restart: (eventId: string) => Promise<void>;
}
export interface ConversationState {
    inputValue: string;
    isTyping: boolean;
    messages: StoredMessage[];
    mode: ChatMode;
}
export interface UseConversationOptions {
    conversationUuid?: string;
    onMessage?: (event: MessageEvent) => Promise<void> | void;
    onStartTyping?: (event: StartTypingEvent) => void;
    onStopTyping?: (event: StopTypingEvent) => void;
    onEpisodeComplete?: (event: EpisodeCompleteEvent) => void;
    onProblem?: (event: ProblemEvent) => void;
    onStart?: (event: StartEvent) => void;
    onReply?: (event: ReplyEvent) => void;
    onResume?: () => void;
    onTap?: () => void;
    onAction?: (event: ActionEvent) => void;
    initialState?: ConversationState;
    onStateChange?: (newState: ConversationState) => void;
    shouldResumeOnConnect?: boolean | StartEvent;
    shouldStartOnConnect?: boolean | StartEvent;
    speechConfig?: SpeechConfig;
    sendIntermediateEvents?: boolean;
}
export declare const useConversation: ({ conversationUuid, onMessage, onStartTyping, onStopTyping, onEpisodeComplete, onProblem, onStart, onReply, onResume, onTap, onAction, initialState, onStateChange, shouldResumeOnConnect, shouldStartOnConnect, speechConfig, sendIntermediateEvents, }: UseConversationOptions) => ConversationChildProps;
export interface ConversationProps extends UseConversationOptions {
    children: (conversation: ConversationChildProps) => ReactNode;
}
export declare const Conversation: ({ children, ...props }: ConversationProps) => React.JSX.Element;
