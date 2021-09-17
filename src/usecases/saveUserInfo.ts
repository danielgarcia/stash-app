import { User } from '../core/stash/User';

/**
 * Get user information.
 * @param {React.ChangeEvent<HTMLInputElement>} e html input event.
 * @returns {Promise<{ err: string }>} returns rentiso user.
 */
async function saveUserInfo(user: User): Promise<{ err: string }> {
    localStorage.setItem('stash-user', JSON.stringify(user));
    return { err: '' };
}

export { saveUserInfo };
