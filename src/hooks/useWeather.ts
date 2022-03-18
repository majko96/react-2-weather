import { useEffect, useState } from "react";
import { IItem } from "../interfaces/IItem";
import { fetchWeather } from "../modules/fetchWeather";

interface IReturn {
    text: string;
    setText: (text: string) => void;
    items: IItem[];
    addItem: () => void;
    isFetching: boolean;
    refetchItem: (index: number) => void;
}

export const useWeather = (): IReturn => {
    const [ text, setText ] = useState<string>('');
    const [ items, setItems ] = useState<IItem[]>([]);
    
    const addItem = () => {
        setItems([
            ...items,
            {
                name: text,
                isFetching: false,
                hasError: false
            }
        ]);
        setText('');
    };

    const refetchItem = (index: number) => {
        const newItems = [...items];
        newItems[index].hasError = false;
        setItems(newItems);
    };

    useEffect(() => {
        const updateItem = (index: number, item: IItem) => {
            const newItems = [...items];
            newItems[index] = item;
            setItems(newItems);
        };

        items.forEach(async (item, index) => {
            if (item.isFetching || item.hasError || item.weather) {
                return;
            }

            updateItem(index, {
                ...item,
                isFetching: true
            });

            try {
                const weather = await fetchWeather(item.name);

                updateItem(index, {
                    ...item,
                    isFetching: false,
                    weather
                });
            } catch (error) {
                updateItem(index, {
                    ...item,
                    isFetching: false,
                    hasError: true
                });
            }
        });
    }, [items]);

    return {
        items,
        addItem,
        isFetching: items.filter(item => item.isFetching).length > 0,
        refetchItem,
        text,
        setText
    };
};