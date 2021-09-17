import { User } from '../core/stash/User';

/**
 * Get user information.
 * @returns {Promise<{ user: User, error: string }>} returns user.
 */
async function getUserInfo(): Promise<{ user: User, error: string }> {
    let user = new User();
    let error = 'Could not get user';
    const response: string | null = localStorage.getItem('stash-user') || '';

    if (response) {
        const stashUser = JSON.parse(response);
        user = new User(stashUser);
        error = '';
    }

    return { user, error };
}

export { getUserInfo };
