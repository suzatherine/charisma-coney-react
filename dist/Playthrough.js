import React, { useEffect, useState } from "react";
import { Playthrough as PlaythroughClass, setGlobalBaseUrl } from "@charisma-ai/sdk";
import { PlaythroughProvider } from "./PlaythroughContext.js";
import useChangeableRef from "./useChangeableRef.js";
// Preserve equality across renders by defining this function outside the component.
const noOp = ()=>undefined;
export const usePlaythrough = ({ playthroughToken , charismaUrl , autoconnect =false , onConnectionStatus =noOp , onError =noOp , onProblem =noOp , onSpeechRecognitionResponse =noOp , onSpeechRecognitionStarted =noOp , onSpeechRecognitionStopped =noOp  })=>{
    const [playthrough, setPlaythrough] = useState();
    const [connectionStatus, setConnectionStatus] = useState("disconnected");
    const onConnectionStatusRef = useChangeableRef(onConnectionStatus);
    const onErrorRef = useChangeableRef(onError);
    const onProblemRef = useChangeableRef(onProblem);
    const onSpeechRecognitionResponseRef = useChangeableRef(onSpeechRecognitionResponse);
    const onSpeechRecognitionStartedRef = useChangeableRef(onSpeechRecognitionStarted);
    const onSpeechRecognitionStoppedRef = useChangeableRef(onSpeechRecognitionStopped);
    useEffect(()=>{
        if (charismaUrl) {
            setGlobalBaseUrl(charismaUrl);
        }
    }, [
        charismaUrl
    ]);
    useEffect(()=>{
        if (playthroughToken) {
            const newPlaythrough = new PlaythroughClass(playthroughToken);
            newPlaythrough.on("connection-status", (newConnectionStatus)=>{
                setConnectionStatus(newConnectionStatus);
                onConnectionStatusRef.current(newConnectionStatus);
            }).on("error", (...args)=>onErrorRef.current(...args)).on("problem", (...args)=>onProblemRef.current(...args)).on("speech-recognition-result", (response)=>onSpeechRecognitionResponseRef.current(response)).on("speech-recognition-started", (data)=>onSpeechRecognitionStartedRef.current(data)).on("speech-recognition-stopped", (data)=>onSpeechRecognitionStoppedRef.current(data));
            setPlaythrough(newPlaythrough);
            return ()=>{
                newPlaythrough.disconnect();
            };
        }
        // Without this, TypeScript complains that not all code paths return a value.
        return undefined;
    }, [
        playthroughToken,
        // All the below refs never change, this is to satisfy the linter.
        onConnectionStatusRef,
        onErrorRef,
        onProblemRef,
        onSpeechRecognitionResponseRef,
        onSpeechRecognitionStartedRef,
        onSpeechRecognitionStoppedRef
    ]);
    useEffect(()=>{
        if (playthrough && autoconnect) {
            playthrough.connect();
        }
    }, [
        playthrough,
        autoconnect
    ]);
    return {
        connectionStatus,
        playthrough,
        playthroughToken
    };
};
export const Playthrough = ({ children , ...props })=>{
    const playthrough = usePlaythrough(props);
    return /*#__PURE__*/ React.createElement(PlaythroughProvider, {
        value: playthrough
    }, typeof children === "function" ? children(playthrough) : children);
};
