import { User } from '../core/stash/User';

/**
 * Saves user information.
 * @param {React.ChangeEvent<HTMLInputElement>} e html input event.
 * @returns {Promise<{ err: string }>} .
 */
async function saveUserInfo(user: User): Promise<{ error: string }> {
    localStorage.setItem('stash-user', JSON.stringify(user));
    return { error: '' };
}

export { saveUserInfo };
