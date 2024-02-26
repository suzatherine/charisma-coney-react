/// <reference types="react" />
import { MessageEvent } from "@charisma-ai/sdk";
interface UseBackgroundVideoOptions {
    disabled?: boolean;
}
declare const useBackgroundVideo: ({ disabled }?: UseBackgroundVideoOptions) => {
    videoProps: {
        ref: import("react").RefObject<HTMLVideoElement>;
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
export type BackgroundVideoElementProps = ReturnType<typeof useBackgroundVideo>["videoProps"];
export default useBackgroundVideo;
