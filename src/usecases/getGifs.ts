import axios, { AxiosRequestConfig, ResponseType } from 'axios';
import { Gif, IGif } from '../core/stash/Gif';

interface Response {
    data: {
        data: IGif[];
        meta: { status: number; msg: string; response_id: string; };
        pagination: { count: number; offset: number; total_count: number; };
    };
}

/**
 * Get user information.
 * @returns {Promise<{ user: Gif, err: string }>} returns rentiso user.
 */
async function getGifs(query: string): Promise<{ gifs: Gif[], err: string }> {
    let gifs: Gif[] = [];
    try {
        const response = await axios.get<JSON, Response>('https://api.giphy.com/v1/gifs/search', { params: { api_key: 'GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw', q: query } });
        console.log(response);
        console.log(response.data);
        gifs = response.data.data.map((gif: IGif) => new Gif(gif)) || [];
    } catch (err) {
        console.log(err);
    }

    return { gifs, err: '' };
}

export { getGifs };
