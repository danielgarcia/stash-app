import { auth } from '../core/services/auth';
import { IGif } from '../core/stash/Gif';

/**
 * Updates the gifs favaorite status.
 * @param {IGif} gif The gif to be saved.
 * @param {boolean} status The gif favorite status.
 * @returns {Promise<{ err: string }>} .
 */
async function updateFavoriteGif(gif: IGif, status: boolean): Promise<{ error: string }> {
    const user = auth.loggedUser;

    if (!user.favorite[gif.id]) user.favorite[gif.id] = gif;
    if (!status) delete user.favorite[gif.id];

    auth.loggedUser = user;
    return { error: '' };
}

export { updateFavoriteGif };
