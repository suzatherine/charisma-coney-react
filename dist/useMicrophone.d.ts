import { SpeechRecognitionOptions, SpeechRecognitionStopOptions } from "@charisma-ai/sdk";
import type { SpeechRecognitionEvent } from "@charisma-ai/sdk/dist/speech-types";
export interface UseMicrophoneOptions {
    onRecogniseInterim?: (text: string) => void;
    onRecognise?: (text: string) => void;
    onResult?: (event: SpeechRecognitionEvent) => void;
    onStart?: () => void;
    onStop?: () => void;
    onTimeout?: () => void;
}
export declare const useMicrophone: ({ onRecogniseInterim, onRecognise, onResult, onStart, onStop, onTimeout, }?: UseMicrophoneOptions) => {
    isSupported: boolean;
    isListening: boolean;
    startListening: (options?: SpeechRecognitionOptions) => void;
    stopListening: (options?: SpeechRecognitionStopOptions) => void;
    resetTimeout: (timeout: number) => void;
};
export default useMicrophone;
