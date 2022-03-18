import { useEffect, useState } from "react";

export const useTypedText = (text: string, delay: number, isActive: boolean): string => {
    const [ count, setCount ] = useState<number>(0);

    useEffect(() => {
        if (!isActive) {
            return;
        }

        setCount(0);

        let intervalId: NodeJS.Timer|null = setInterval(() => {
            setCount(oldCount => {
                if (oldCount === text.length) {                    
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                    
                    console.log('Menim charactery');
                    return oldCount;
                }

                return oldCount + 1;
            });
        }, delay);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };
    }, [delay, text, isActive]);

    if (!text) {
        return '';
    }

    return text.substring(0, count);
};