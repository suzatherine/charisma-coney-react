/// <reference types="react" />
declare const useChangeableRef: <T>(value: T) => import("react").MutableRefObject<T>;
export default useChangeableRef;
