export interface UseSpeakerOptions {
    onStart?: () => void;
    onStop?: () => void;
}
export declare const useSpeaker: ({ onStart, onStop }?: UseSpeakerOptions) => {
    isAvailable: boolean;
    isSpeaking: boolean;
    play: (audio: ArrayBuffer, options?: boolean | import("@charisma-ai/sdk/dist/Speaker.js").SpeakerPlayOptions | undefined) => Promise<void>;
    makeAvailable: () => void;
};
export default useSpeaker;
