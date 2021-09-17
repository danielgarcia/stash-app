export interface IGif {
    id: string;
    url: string;
    rating: string;
    source: string;
    title: string;
    username: string;
    images: {
        original: {
            height: string;
            width: string;
            url: string;
        };
        preview: {
            height: string;
            width: string;
            mp4: string;
        }
    }
}

export class Gif {
    public constructor(gif?: IGif) {
        if (gif) {
            this.id = gif.id || '';
            this.url = gif.url || '';
            this.rating = gif.rating || '';
            this.source = gif.source || '';
            this.title = gif.title || '';
            this.username = gif.username || '';
            if (gif.images && gif.images.original) {
                this.images = {
                    original: {
                        height: gif.images.original.height,
                        width: gif.images.original.width,
                        url: gif.images.original.url,
                    },
                    preview: {
                        height: gif.images.preview.height,
                        width: gif.images.preview.width,
                        mp4: gif.images.preview.mp4,
                    },
                };
            }
        }
    }

    public id = '';

    public url = '';

    public rating = '';

    public source = '';

    public title = '';

    public username = '';

    public images = {
        original: {
            height: '',
            width: '',
            url: '',
        },
        preview: {
            height: '',
            width: '',
            mp4: '',
        },
    };
}
