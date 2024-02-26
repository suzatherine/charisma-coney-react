import {
  SpeechRecognitionResponse,
  SpeechRecognitionStarted,
  SpeechRecognitionStopped,
  useConversation,
  usePlaythroughContext,
} from "@charisma-ai/react";
import RecordingSwitch from "./RecordingSwitch";
import MessagesView from "./MessagesView";
import { useEffect, useState } from "react";
import RecordingIndicator from "./RecordingIndicator";

type ConversationViewProps = {
  conversationUuid: string | undefined;
  startGraphReferenceId: string | undefined;
};

const ConversationView = ({
  conversationUuid,
  startGraphReferenceId,
}: ConversationViewProps) => {
  const [service, setService] = useState<string>("");
  const playthroughContext = usePlaythroughContext();
  const playthrough = playthroughContext?.playthrough;

  const { messages, start, inputValue, reply, type } = useConversation({
    conversationUuid,
  });

  const handleSpeechRecognitionResponse = (
    speechRecognitionResponse: SpeechRecognitionResponse,
  ) => {
    if (speechRecognitionResponse.isFinal) {
      reply({ text: speechRecognitionResponse.text });
      type("");
    } else {
      type(speechRecognitionResponse.text);
    }
  };

  const handleSpeechRecognitionStarted = (
    speechRecognitionStarted: SpeechRecognitionStarted,
  ) => {
    setService(speechRecognitionStarted.service);
  };

  const handleSpeechRecognitionStopped = (
    speechRecognitionStopped: SpeechRecognitionStopped,
  ) => {
    setService("");
  };

  useEffect(() => {
    playthrough?.on(
      "speech-recognition-result",
      handleSpeechRecognitionResponse,
    );
    playthrough?.on(
      "speech-recognition-started",
      handleSpeechRecognitionStarted,
    );
    playthrough?.on(
      "speech-recognition-stopped",
      handleSpeechRecognitionStopped,
    );
    return () => {
      playthrough?.off(
        "speech-recognition-result",
        handleSpeechRecognitionResponse,
      );
      playthrough?.off(
        "speech-recognition-started",
        handleSpeechRecognitionStarted,
      );
      playthrough?.off(
        "speech-recognition-stopped",
        handleSpeechRecognitionStopped,
      );
    };
  }, [playthrough]);

  if (!conversationUuid) {
    return <div>Getting Conversation...</div>;
  }
  if (playthroughContext?.connectionStatus !== "connected") {
    return <div>Connecting...</div>;
  }

  return (
    <div className="convoWrapper">
      <div className="startWrapper">
        <button onClick={() => start({ startGraphReferenceId })}>Start</button>
        <div
          className={`connectionStatus ${
            playthroughContext.connectionStatus === "connected"
              ? "connected"
              : ""
          }`}
        ></div>
      </div>

      <br />
      <br />
      <div className="messagesWrapper">
        <MessagesView messages={messages} />
        <br />
        <div>
          <input
            className="typeInput"
            onChange={({ currentTarget: { value } }) => type(value)}
            value={inputValue}
            onKeyDown={({ key }) => {
              if (key === "Enter") {
                reply({ text: inputValue });
              }
            }}
          />{" "}
          <RecordingSwitch />
          <RecordingIndicator service={service} />
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
