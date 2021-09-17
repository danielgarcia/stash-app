import axios from 'axios';
import { Gif, IGif } from '../core/stash/Gif';

interface Response {
    data: {
        data: IGif;
        meta: { status: number; msg: string; response_id: string; };
        pagination: { count: number; offset: number; total_count: number; };
    };
}

/**
 * Get gif information.
 * @returns {Promise<{ user: Gif, err: string }>} returns gif.
 */
async function getGif(gifID: string): Promise<{ gif: Gif, error: string }> {
    let gif: Gif = new Gif();
    let error = '';
    try {
        const response = await axios.get<JSON, Response>(`https://api.giphy.com/v1/gifs/${gifID}`, { params: { api_key: 'GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw' } });
        gif = response.data.data;
    } catch {
        error = 'Gif not found';
    }

    return { gif, error };
}

export { getGif };
