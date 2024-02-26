import React, { useEffect, useRef, useMemo } from "react";
import { usePlaythroughContext } from "./PlaythroughContext.js";
import useChangeableRef from "./useChangeableRef.js";
const createEventHandler = (ref)=>(...args)=>{
        if (ref.current) {
            ref.current(...args);
        }
    };
export const useSimpleConversation = ({ conversationUuid , onMessage , onStartTyping , onStopTyping , onEpisodeComplete , onProblem , onAction , onReply , onResume , onStart , onTap , onPlaybackStart , onPlaybackStop , speechConfig  })=>{
    const playthroughContext = usePlaythroughContext();
    if (playthroughContext === undefined) {
        throw new Error(`To use \`SimpleConversation\`, you must wrap it within a \`Playthrough\` instance.`);
    }
    // These need to be refs, so we don't have to keep attaching and deattaching
    // the conversation `on` handlers. We can refer to the constant ref instead.
    const onMessageRef = useChangeableRef(onMessage);
    const onStartTypingRef = useChangeableRef(onStartTyping);
    const onStopTypingRef = useChangeableRef(onStopTyping);
    const onEpisodeCompleteRef = useChangeableRef(onEpisodeComplete);
    const onProblemRef = useChangeableRef(onProblem);
    const onActionRef = useChangeableRef(onAction);
    const onReplyRef = useChangeableRef(onReply);
    const onResumeRef = useChangeableRef(onResume);
    const onStartRef = useChangeableRef(onStart);
    const onTapRef = useChangeableRef(onTap);
    const onPlaybackStartRef = useChangeableRef(onPlaybackStart);
    const onPlaybackStopRef = useChangeableRef(onPlaybackStop);
    const speechConfigRef = useChangeableRef(speechConfig);
    const conversationRef = useRef();
    const { playthrough  } = playthroughContext;
    useEffect(()=>{
        if (playthrough && conversationUuid) {
            const conversation = playthrough.joinConversation(conversationUuid);
            conversation.on("message", createEventHandler(onMessageRef));
            conversation.on("start-typing", createEventHandler(onStartTypingRef));
            conversation.on("stop-typing", createEventHandler(onStopTypingRef));
            conversation.on("episode-complete", createEventHandler(onEpisodeCompleteRef));
            conversation.on("problem", createEventHandler(onProblemRef));
            conversation.on("action", createEventHandler(onActionRef));
            conversation.on("reply", createEventHandler(onReplyRef));
            conversation.on("resume", createEventHandler(onResumeRef));
            conversation.on("start", createEventHandler(onStartRef));
            conversation.on("tap", createEventHandler(onTapRef));
            conversation.on("playback-start", createEventHandler(onPlaybackStartRef));
            conversation.on("playback-stop", createEventHandler(onPlaybackStopRef));
            conversation.setSpeechConfig(speechConfigRef.current);
            conversationRef.current = conversation;
        }
        return ()=>{
            if (playthrough && conversationUuid && playthrough.getConversation(conversationUuid)) {
                playthrough.leaveConversation(conversationUuid);
                conversationRef.current = undefined;
            }
        };
    }, [
        playthrough,
        conversationUuid,
        onMessageRef,
        onStartTypingRef,
        onStopTypingRef,
        onEpisodeCompleteRef,
        onPlaybackStartRef,
        onPlaybackStopRef,
        onProblemRef,
        speechConfigRef,
        onActionRef,
        onReplyRef,
        onResumeRef,
        onStartRef,
        onTapRef
    ]);
    useEffect(()=>{
        if (conversationRef.current) {
            conversationRef.current.setSpeechConfig(speechConfig);
        }
    }, [
        speechConfig
    ]);
    const returnedValue = useMemo(()=>{
        return {
            start: (event)=>{
                if (conversationRef.current) {
                    conversationRef.current.start(event);
                }
            },
            reply: (event)=>{
                if (conversationRef.current) {
                    conversationRef.current.reply(event);
                }
            },
            replyIntermediate: (event)=>{
                if (conversationRef.current) {
                    conversationRef.current.replyIntermediate(event);
                }
            },
            tap: ()=>{
                if (conversationRef.current) {
                    conversationRef.current.tap();
                }
            },
            action: (event)=>{
                if (conversationRef.current) {
                    conversationRef.current.action(event);
                }
            },
            resume: ()=>{
                if (conversationRef.current) {
                    conversationRef.current.resume();
                }
            }
        };
    }, []);
    return returnedValue;
};
export const SimpleConversation = ({ children , ...props })=>{
    const conversation = useSimpleConversation(props);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children(conversation));
};
