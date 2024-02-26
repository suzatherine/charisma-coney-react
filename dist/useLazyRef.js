import { useRef } from "react";
const noValue = Symbol("lazyRef.noValue");
const useLazyRef = (getInitialValue)=>{
    const lazyRef = useRef(noValue);
    if (lazyRef.current === noValue) {
        lazyRef.current = getInitialValue();
    }
    return lazyRef;
};
export default useLazyRef;
