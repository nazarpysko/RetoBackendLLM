import axios from 'axios';

interface ChuckNorrisJoke {
    categories: string[];
    created_at: string;
    icon_url: string;
    id: string;
    updated_at: string;
    url: string;
    value: string;
}

const getChuckNorrisJoke = async (): Promise<string> => {
    const response = await axios.get<ChuckNorrisJoke>(`https://api.chucknorris.io/jokes/random`);
    return response.data.value;
}

const getDadJoke = async (): Promise<string> => {
    const response = await axios.get('https://icanhazdadjoke.com', {
        headers: { Accept: 'text/plain' }
    });
    return response.data as string;
}

export { ChuckNorrisJoke, getChuckNorrisJoke, getDadJoke };
