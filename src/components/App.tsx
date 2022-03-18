import { FC, useMemo } from "react";
import { useTypedTexts } from "../hooks/useTypedTexts";
import { useWeather } from "../hooks/useWeather";

export const App: FC = () => {
    const {
        text,
        setText,
        items,
        addItem,
        isFetching,
        refetchItem,
    } = useWeather();

    const typedText = useTypedTexts(
        ['Bytca', 'Zilina', 'Kosice'],
        1500,
        100,
        text.length === 0
    );

    return <div>
        {items.map((item, index) => (
            <div key={index}>
                <div><strong>Name:</strong> {item.name}</div>
                <div><strong>isFetching:</strong> {item.isFetching ? 'yes' : 'no'}</div>
                <div><strong>hasError:</strong> {item.hasError ? 'yes' : 'no'}</div>
                <div>
                    <strong>Weather:</strong>
                    {item.weather?.description || '-'}
                </div>
                {item.hasError && (
                    <button
                        type="button"
                        onClick={() => {
                            refetchItem(index);
                        }}
                    >Fixni ten shit</button>
                )}
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
        <button
            type="button"
            disabled={isFetching || !text}
            onClick={() => {
                addItem();
            }}
        >Add</button>
    </div>;
};