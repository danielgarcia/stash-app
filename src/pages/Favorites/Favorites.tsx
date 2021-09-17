import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GifMosaic from '../../core/components/GifMosaic/GifMosaic';
import LoadingBars from '../../core/components/LoadingBars/LoadingBars';
import { auth } from '../../core/services/auth';
import { Gif } from '../../core/stash/Gif';

interface State {
    loading: boolean;
    gifs: Gif[];
}

class Favorites extends React.Component<RouteComponentProps, State> {
    // Unsubscribes to user updates.
    private unsubscribeUser = () => {};

    // State of the component
    public readonly state: Readonly<State> = {
        loading: true,
        gifs: [],
    };

    /**
     * Checks if the Gif is saved as favorite.
     * @returns {Promise<void>}
     */
    public async componentDidMount(): Promise<void> {
        this.unsubscribeUser = auth.subscribeToUser((user) => {
            this.setState({ gifs: Object.values(user.favorite), loading: false });
        });
    }

    /**
     * Component unmount logic.
     */
    public componentWillUnmount(): void {
        this.unsubscribeUser();
    }

    // Main Render Function
    public render(): JSX.Element {
        const { loading, gifs } = this.state;

        return (
            <div className="favorites-page">
                <h1>My Favorites</h1>
                <GifMosaic gifs={gifs} />
                {loading ? <LoadingBars /> : null}
            </div>
        );
    }
}

export default Favorites;
