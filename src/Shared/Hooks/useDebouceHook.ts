import React from "react";

// Write a function to wrap common debounce behavior logic

export const useDebounceHook = <TValue, TDebounceValue>(initSourceValue:TValue, initDebouceValue:TDebounceValue, milliseconds:number, callbackFunction: (source:TValue) => TDebounceValue) => {
    
    const [sourceValue,setSourceValue]       = React.useState<TValue>(initSourceValue)
    const [debouncedValue,setDebouncedValue] = React.useState<TDebounceValue>(initDebouceValue);
    
    React.useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            setDebouncedValue(callbackFunction(sourceValue))
        },milliseconds);

        return () => {
            clearTimeout(timer); 
        }
    },[sourceValue,callbackFunction,milliseconds]); 

    return [sourceValue,setSourceValue,debouncedValue,setDebouncedValue] as const;
}