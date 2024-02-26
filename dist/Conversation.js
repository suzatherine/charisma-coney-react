import React, { useEffect, useRef, useCallback, useReducer, useState } from "react";
import { useQueuedConversation } from "./QueuedConversation.js";
import { usePlaythroughContext } from "./PlaythroughContext.js";
export var ChatMode;
(function(ChatMode) {
    ChatMode["Tap"] = "tap";
    ChatMode["Chat"] = "chat";
})(ChatMode || (ChatMode = {}));
const reducer = (prevState, action)=>{
    switch(action.type){
        case "MESSAGE_CHARACTER":
            {
                return {
                    ...prevState,
                    messages: [
                        ...prevState.messages,
                        action.payload
                    ],
                    mode: action.payload.tapToContinue ? ChatMode.Tap : ChatMode.Chat
                };
            }
        case "MESSAGE_PLAYER":
            {
                return {
                    ...prevState,
                    messages: [
                        ...prevState.messages,
                        action.payload
                    ],
                    inputValue: ""
                };
            }
        case "START_TYPING":
            {
                return {
                    ...prevState,
                    isTyping: true
                };
            }
        case "STOP_TYPING":
            {
                return {
                    ...prevState,
                    isTyping: false
                };
            }
        case "TYPE":
            {
                return {
                    ...prevState,
                    inputValue: action.payload
                };
            }
        case "RESET":
            {
                return {
                    ...prevState,
                    messages: []
                };
            }
        case "RESTART":
            {
                const index = prevState.messages.findIndex((message)=>message.type === "character" || message.type === "media" || message.type === "panel" ? message.eventId === action.payload : false);
                if (index === -1) {
                    return prevState;
                }
                return {
                    ...prevState,
                    messages: prevState.messages.slice(0, index)
                };
            }
        default:
            return prevState;
    }
};
export const useConversation = ({ conversationUuid , onMessage , onStartTyping , onStopTyping , onEpisodeComplete , onProblem , onStart , onReply , onResume , onTap , onAction , initialState , onStateChange , shouldResumeOnConnect , shouldStartOnConnect , speechConfig , sendIntermediateEvents  })=>{
    const [state, dispatch] = useReducer(reducer, initialState || {
        inputValue: "",
        isTyping: false,
        messages: [],
        mode: ChatMode.Chat
    });
    const { inputValue , isTyping , messages , mode  } = state;
    useEffect(()=>{
        if (onStateChange) {
            onStateChange(state);
        }
    }, [
        onStateChange,
        state
    ]);
    const handleMessage = useCallback(async (event)=>{
        dispatch({
            type: "MESSAGE_CHARACTER",
            payload: event
        });
        if (onMessage) {
            await onMessage(event);
        }
    }, [
        onMessage
    ]);
    const handleStartTyping = useCallback((event)=>{
        dispatch({
            type: "START_TYPING"
        });
        if (onStartTyping) {
            onStartTyping(event);
        }
    }, [
        onStartTyping
    ]);
    const handleStopTyping = useCallback((event)=>{
        dispatch({
            type: "STOP_TYPING"
        });
        if (onStopTyping) {
            onStopTyping(event);
        }
    }, [
        onStopTyping
    ]);
    const { start , reply , replyIntermediate , resume , tap , action  } = useQueuedConversation({
        conversationUuid,
        onMessage: handleMessage,
        onStartTyping: handleStartTyping,
        onStopTyping: handleStopTyping,
        onEpisodeComplete,
        onProblem,
        speechConfig
    });
    const playthroughContext = usePlaythroughContext();
    const hasHandledMount = useRef(false);
    useEffect(()=>{
        if (playthroughContext?.connectionStatus === "connected" && !hasHandledMount.current) {
            hasHandledMount.current = true;
            if (shouldResumeOnConnect) {
                resume();
            }
            if (shouldStartOnConnect) {
                const event = shouldStartOnConnect === true ? {} : shouldStartOnConnect;
                start(event);
            }
        }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [
        playthroughContext?.connectionStatus
    ]);
    const handleStart = useCallback((event = {})=>{
        dispatch({
            type: "RESET"
        });
        if (onStart) {
            onStart(event);
        }
        start(event);
    }, [
        onStart,
        start
    ]);
    const handleReply = useCallback((event)=>{
        if (onReply) {
            onReply(event);
        }
        dispatch({
            type: "MESSAGE_PLAYER",
            payload: {
                type: "player",
                timestamp: Date.now(),
                message: {
                    text: event.text
                }
            }
        });
        reply(event);
    }, [
        onReply,
        reply
    ]);
    const handleTap = useCallback(()=>{
        if (onTap) {
            onTap();
        }
        tap();
    }, [
        onTap,
        tap
    ]);
    const handleAction = useCallback((event)=>{
        if (onAction) {
            onAction(event);
        }
        action(event);
    }, [
        onAction,
        action
    ]);
    const handleResume = useCallback(()=>{
        if (onResume) {
            onResume();
        }
        resume();
    }, [
        onResume,
        resume
    ]);
    const handleType = useCallback((text)=>{
        if (sendIntermediateEvents) {
            replyIntermediate({
                text,
                inputType: "keyboard"
            });
        }
        dispatch({
            type: "TYPE",
            payload: text
        });
    }, [
        replyIntermediate,
        sendIntermediateEvents
    ]);
    const [isRestarting, setIsRestarting] = useState(false);
    const handleRestart = useCallback(async (eventId)=>{
        if (playthroughContext && playthroughContext.playthrough) {
            setIsRestarting(true);
            try {
                await playthroughContext.playthrough.restartFromEventId(eventId);
                dispatch({
                    type: "RESTART",
                    payload: eventId
                });
            } finally{
                setIsRestarting(false);
            }
        }
    }, [
        playthroughContext
    ]);
    return {
        inputValue,
        isRestarting,
        isTyping,
        messages,
        mode,
        type: handleType,
        start: handleStart,
        reply: handleReply,
        tap: handleTap,
        action: handleAction,
        resume: handleResume,
        restart: handleRestart
    };
};
export const Conversation = ({ children , ...props })=>{
    const conversation = useConversation(props);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children(conversation));
};
