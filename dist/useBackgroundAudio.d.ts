/// <reference types="react" />
import { MessageEvent } from "@charisma-ai/sdk";
interface UseBackgroundAudioOptions {
    disabled?: boolean;
}
declare const useBackgroundAudio: ({ disabled }?: UseBackgroundAudioOptions) => {
    audioProps: {
        ref: import("react").RefObject<HTMLAudioElement>;
        src: string | undefined;
        autoPlay: boolean;
        loop: boolean;
        onEnded: () => void;
        style: {
            display: string;
        };
    };
    onMessage: (messageEvent: MessageEvent) => Promise<void>;
};
export type BackgroundAudioElementProps = ReturnType<typeof useBackgroundAudio>["audioProps"];
export default useBackgroundAudio;
