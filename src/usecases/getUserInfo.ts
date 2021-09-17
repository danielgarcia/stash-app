import { User } from '../core/stash/User';

/**
 * Get user information.
 * @returns {Promise<{ user: User, err: string }>} returns rentiso user.
 */
async function getUserInfo(): Promise<{ user: User, err: string }> {
    let user = new User();
    const response: string | null = localStorage.getItem('stash-user') || '';

    if (response) {
        const stashUser = JSON.parse(response);
        user = new User(stashUser);
    }

    return { user, err: '' };
}

export { getUserInfo };
