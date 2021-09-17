import { auth } from '../core/services/auth';
import { IGif } from '../core/stash/Gif';

/**
 * Get user information.
 * @param {IGif} gif The gif to be saved.
 * @param {boolean} status The gif favorite status.
 * @returns {Promise<{ err: string }>} returns rentiso user.
 */
async function updateFavoriteGif(gif: IGif, status: boolean): Promise<{ err: string }> {
    const user = auth.loggedUser;

    if (!user.favorite[gif.id]) user.favorite[gif.id] = gif;
    if (!status) delete user.favorite[gif.id];

    auth.loggedUser = user;
    return { err: '' };
}

export { updateFavoriteGif };
