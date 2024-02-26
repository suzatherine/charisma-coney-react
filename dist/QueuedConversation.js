import React, { useRef, useCallback } from "react";
import Queue from "p-queue";
import { useSimpleConversation } from "./SimpleConversation.js";
export const useQueuedConversation = (props)=>{
    const messageQueue = useRef(new Queue({
        concurrency: 1
    }));
    const { onMessage  } = props;
    const handleMessage = useCallback((event)=>{
        if (onMessage) {
            messageQueue.current.add(()=>onMessage(event));
        }
    }, [
        onMessage
    ]);
    const { reply , ...childProps } = useSimpleConversation({
        ...props,
        onMessage: handleMessage
    });
    const handleReply = useCallback((event)=>{
        // Replying interrupts any pending events (likely none, unless slow connection)
        messageQueue.current.clear();
        messageQueue.current = new Queue({
            concurrency: 1
        });
        reply(event);
    }, [
        reply
    ]);
    return {
        ...childProps,
        reply: handleReply
    };
};
export const QueuedConversation = ({ children , ...props })=>{
    const conversation = useQueuedConversation(props);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children(conversation));
};
