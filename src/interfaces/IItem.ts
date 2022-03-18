import { IWeather } from "./IWeather";

export interface IItem {
    name: string;
    isFetching: boolean;
    hasError: boolean;
    weather?: IWeather;
}