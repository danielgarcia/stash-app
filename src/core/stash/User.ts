import { IGif } from './Gif';

/**
 * IUser interface.
 */
export interface IUser {
    name: string;
    favorite: {
        [key: string]: IGif;
    };
}

export class User {
    public constructor(user?: IUser) {
        if (user) {
            this.name = user.name;
            this.favorite = user.favorite || {};
        }
    }

    public name = '';

    public favorite: { [key: string]: IGif; } = {};
}
