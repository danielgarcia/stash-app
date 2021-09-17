import { IGif } from './Gif';

/**
 * IUser interface.
 */
export interface IUser {
    favorite: {
        [key: string]: IGif;
    };
}

export class User {
    public constructor(user?: IUser) {
        if (user) {
            this.favorite = user.favorite || {};
        }
    }

    public favorite: { [key: string]: IGif; } = {};
}
