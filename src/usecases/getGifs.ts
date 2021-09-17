import axios from 'axios';
import { Gif, IGif } from '../core/stash/Gif';

interface Response {
    data: {
        data: IGif[];
        meta: { status: number; msg: string; response_id: string; };
        pagination: { count: number; offset: number; total_count: number; };
    };
}

/**
 * Gets searched gifs.
 * @param {string} query the query to search.
 * @param {number} page the page to search
 * @returns {Promise<{ gifs: Gif, error: string, moreGifsAvailable: boolean }>} returns gifs.
 */
async function getGifs(query: string, page: number): Promise<{ gifs: Gif[], error: string, moreGifsAvailable: boolean }> {
    let gifs: Gif[] = [];
    let error = '';
    const limit = 25;
    const offset = limit * page;
    let moreGifsAvailable = true;
    try {
        const response = await axios.get<JSON, Response>('https://api.giphy.com/v1/gifs/search', { params: { api_key: 'GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw', q: query, limit, offset } });
        gifs = response.data.data.map((gif: IGif) => new Gif(gif)) || [];

        if (gifs.length < limit || !gifs.length) moreGifsAvailable = false;
    } catch {
        error = 'Cannot load Gifs';
    }

    return { gifs, error, moreGifsAvailable };
}

export { getGifs };
