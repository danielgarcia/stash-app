import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GifCard from '../../core/components/GifMosaic/GifCard';
import LoadingBars from '../../core/components/LoadingBars/LoadingBars';
import { Gif } from '../../core/stash/Gif';
import { getGif } from '../../usecases/getGif';

interface Params {
    gifID: string;
}

interface State {
    gif: Gif;
    error: string;
    loading: boolean;
}

class GifDetails extends React.Component<RouteComponentProps<Params>, State> {
    // State of the component
    public readonly state: Readonly<State> = {
        gif: new Gif(),
        loading: true,
        error: '',
    };

    /**
     * Checks if the Gif is saved as favorite.
     * @returns {Promise<void>}
     */
    public async componentDidMount(): Promise<void> {
        const { gifID } = this.props.match.params;
        this.setState({ loading: true });
        const { gif, error } = await getGif(gifID);
        this.setState({ gif, loading: false, error });
    }

    /**
     * Renders the error message.
     * @returns {JSX.Element} html element.
     */
    public renderError(): JSX.Element {
        const { error } = this.state;
        if (error === '') return <></>;
        return (
            <div className="error-msg">
                <i className="fa fa-exclamation-triangle" />
                {error}
            </div>
        );
    }

    /**
     * Renders the gif.
     * @returns {JSX.Element} html element.
     */
    public renderGif(): JSX.Element {
        const { gif } = this.state;
        if (gif.title === '') return <></>;

        return <div className="gif"><GifCard item={gif} /></div>;
    }

    // Main Render Function
    public render(): JSX.Element {
        const { gif, loading } = this.state;

        return (
            <div className="gif-details-page">
                <h1>{loading ? 'Loading Gif...' : gif.title}</h1>
                {this.renderError()}
                {loading ? <LoadingBars /> : this.renderGif()}
            </div>
        );
    }
}

export default GifDetails;
