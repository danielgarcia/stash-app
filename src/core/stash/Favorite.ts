export interface IFavorite {
    id: string;
    url: string;
}

export class Favorite {
    public constructor(favorite?: IFavorite) {
        if (favorite) {
            this.id = favorite.id || '';
            this.url = favorite.url;
        }
    }

    public id = '';

    public url = '';
}
