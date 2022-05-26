import { FC, useMemo } from "react";
import { useTypedTexts } from "../hooks/useTypedTexts";
import { useWeather } from "../hooks/useWeather";
import {IItem} from "../interfaces/IItem";

export const App: FC = () => {
    const {
        text,
        setText,
        items,
        addItem,
        isFetching,
        reFetchItem,
        removeAllItems,
        removeItem
    } = useWeather();

    const typedText = useTypedTexts(
        ['Bytca', 'Zilina', 'Kosice'],
        1500,
        100,
        text.length === 0
    );

    const renderReFetchButton = (index: number, hasError: boolean) => {
        if (hasError) {
            return;
        }
        return (
            <>
                <button
                    type="button"
                    onClick={() => {
                        reFetchItem(index, true);
                    }}
                >reFetch</button>
            </>
        )
    }

    const renderDeleteButton = (item: IItem) => {
        return (
            <>
                <button
                    type="button"
                    onClick={() => {
                        removeItem(item);
                    }}
                >Delete</button>
            </>

        )
    }

    return <div>
        {items.map((item, index) => (
            <div key={index}>
                {renderDeleteButton(item)}
                <div><strong>Name:</strong> {item.name}</div>
                <div><strong>isFetching:</strong> {item.isFetching ? 'yes' : 'no'}</div>
                <div><strong>hasError:</strong> {item.hasError ? 'yes' : 'no'}</div>
                <div>
                    <strong>Weather:</strong>
                    {item.weather?.description || '-'}
                </div>
                <div>
                    <strong>Temp:</strong>
                    {item.weather?.temp + ' °C' || '-'}
                </div>
                {item.hasError && (
                    <button
                        type="button"
                        onClick={() => {
                            reFetchItem(index);
                        }}
                    >Fixni ten shit</button>
                )}
                {renderReFetchButton(index, item.hasError)}
                <hr />
            </div>
        ))}
        <input
            type="text"
            value={text}
            placeholder={typedText}
            onChange={event => {
                setText(event.target.value);
            }}
        />
        <div className={'row'}>
            <button
                type="button"
                disabled={items.length === 0}
                onClick={() => {
                    removeAllItems();
                }}
            >Delete all</button>
            <button
                type="button"
                disabled={isFetching || !text}
                onClick={() => {
                    addItem();
                }}
            >Add</button>
        </div>
    </div>;
};
