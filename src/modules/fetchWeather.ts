import axios from 'axios';
import { IWeather } from "../interfaces/IWeather";

export const fetchWeather = (name: string): Promise<IWeather> => {
    if (Math.random() > 0.7) {
        return Promise.reject('Shit');
    }

    return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9877f88cec9db79e9e74254de7a470b6`
    ).then(response => {
        if (response.status !== 200) {
            throw new Error(`Response status was ${response.status}`);
        }

        return {
            description: response.data.weather[0].main
        };
    });

    // return fetch(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9877f88cec9db79e9e74254de7a470b6`
    // ).then(response => {
    //     if (response.status !== 200) {
    //         throw new Error(`Response status was ${response.status}`);
    //     }

    //     return response.json();
    // }).then(data => {
    //     return {
    //         description: data.weather[0].main
    //     };
    // });
};