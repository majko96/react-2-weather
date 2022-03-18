import { useEffect, useState } from "react";
import { useTypedText } from "./useTypedText";

export const useTypedTexts = (
    texts: string[],
    delay: number,
    delayCharacters: number,
    isActive: boolean
): string => {
    const [ index, setIndex ] = useState<number>(0);
    const text = useTypedText(texts[index] || '', delayCharacters, isActive);
    
    useEffect(() => {
        if (!isActive) {
            return;
        }

        const intervalId = setInterval(() => {
            console.log('Menim texty');
            setIndex(oldIndex => {
                return (oldIndex + 1) % texts.length;
            });
        }, delay);

        return () => {
            clearInterval(intervalId);
        };
    }, [delay, texts, isActive]);

    return text;
};