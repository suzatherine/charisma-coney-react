import React from "react";
import { ReplyEvent, MessageEvent } from "@charisma-ai/sdk";
import { UseSimpleConversationOptions, SimpleConversationChildProps } from "./SimpleConversation.js";
export type UseQueuedConversationOptions = Omit<UseSimpleConversationOptions, "onMessage"> & {
    onMessage?: (event: MessageEvent) => Promise<void> | void;
};
export type QueuedConversationChildProps = SimpleConversationChildProps;
export declare const useQueuedConversation: (props: UseQueuedConversationOptions) => {
    reply: (event: ReplyEvent) => void;
    start: (event?: import("@charisma-ai/sdk").StartEvent | undefined) => void;
    replyIntermediate: (event: import("@charisma-ai/sdk").ReplyIntermediateEvent) => void;
    tap: () => void;
    action: (event: import("@charisma-ai/sdk").ActionEvent) => void;
    resume: () => void;
};
export interface QueuedConversationProps extends UseQueuedConversationOptions {
    children: (conversation: SimpleConversationChildProps) => React.ReactNode;
}
export declare const QueuedConversation: ({ children, ...props }: QueuedConversationProps) => React.JSX.Element;
