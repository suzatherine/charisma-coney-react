import { useRef, useEffect } from "react";
const useChangeableRef = (value)=>{
    const valueRef = useRef(value);
    useEffect(()=>{
        valueRef.current = value;
    }, [
        value
    ]);
    return valueRef;
};
export default useChangeableRef;
