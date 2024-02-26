/// <reference types="react" />
declare const useLazyRef: <Value>(getInitialValue: () => Value) => import("react").MutableRefObject<Value>;
export default useLazyRef;
