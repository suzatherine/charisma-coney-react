import React from "react";
import { Conversation as ConversationType, MessageEvent, StartTypingEvent, StopTypingEvent, EpisodeCompleteEvent, SpeechConfig, ConfirmActionEvent, ConfirmReplyEvent, ConfirmResumeEvent, ConfirmStartEvent, ConfirmTapEvent, ProblemEvent } from "@charisma-ai/sdk";
export interface UseSimpleConversationOptions {
    conversationUuid?: string;
    onMessage?: (event: MessageEvent) => void;
    onStartTyping?: (event: StartTypingEvent) => void;
    onStopTyping?: (event: StopTypingEvent) => void;
    onEpisodeComplete?: (event: EpisodeCompleteEvent) => void;
    onProblem?: (event: ProblemEvent) => void;
    onAction?: (event: ConfirmActionEvent) => void;
    onReply?: (event: ConfirmReplyEvent) => void;
    onResume?: (event: ConfirmResumeEvent) => void;
    onStart?: (event: ConfirmStartEvent) => void;
    onTap?: (event: ConfirmTapEvent) => void;
    onPlaybackStart?: () => void;
    onPlaybackStop?: () => void;
    speechConfig?: SpeechConfig;
}
export interface SimpleConversationChildProps {
    start: ConversationType["start"];
    reply: ConversationType["reply"];
    replyIntermediate: ConversationType["replyIntermediate"];
    tap: ConversationType["tap"];
    action: ConversationType["action"];
    resume: ConversationType["resume"];
}
export declare const useSimpleConversation: ({ conversationUuid, onMessage, onStartTyping, onStopTyping, onEpisodeComplete, onProblem, onAction, onReply, onResume, onStart, onTap, onPlaybackStart, onPlaybackStop, speechConfig, }: UseSimpleConversationOptions) => SimpleConversationChildProps;
export interface SimpleConversationProps extends UseSimpleConversationOptions {
    children: (conversation: SimpleConversationChildProps) => React.ReactNode;
}
export declare const SimpleConversation: ({ children, ...props }: SimpleConversationProps) => React.JSX.Element;
