import { createContext, useContext } from "react";
export const PlaythroughContext = createContext(undefined);
export const PlaythroughProvider = PlaythroughContext.Provider;
export const PlaythroughConsumer = PlaythroughContext.Consumer;
export const usePlaythroughContext = ()=>useContext(PlaythroughContext);
