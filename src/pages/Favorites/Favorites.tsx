import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getGifs } from '../../usecases/getGifs';
import { Gif } from '../../core/stash/Gif';
import { auth } from '../../core/services/auth';
import GifMosaic from '../../core/components/GifMosaic/GifMosaic';

interface State {
    loading: boolean;
    gifs: Gif[];
}

class Favorites extends React.Component<RouteComponentProps, State> {
    public constructor(props: RouteComponentProps) {
        super(props);
    }

    // State of the component
    public readonly state: Readonly<State> = {
        loading: true,
        gifs: [],
    };

    /**
     * Checks if the Gif is saved as favorite.
     * @returns {void}
     */
    public async componentDidMount(): Promise<void> {
        this.setState({ gifs: Object.values(auth.loggedUser.favorite) });
    }

    // Main Render Function
    public render(): JSX.Element {
        const { loading, gifs } = this.state;

        return (
            <div className="favorites-page">
                <h1>My Favorites</h1>
                <GifMosaic gifs={gifs} />
            </div>
        );
    }
}

export default Favorites;
