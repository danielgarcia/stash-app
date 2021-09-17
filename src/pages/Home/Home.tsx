import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getGifs } from '../../usecases/getGifs';
import { Gif } from '../../core/stash/Gif';
import GifMosaic from '../../core/components/GifMosaic/GifMosaic';
import { routes } from '../../Routes';

interface Params {
    search?: string;
}

interface State {
    loading: boolean;
    query: string;
    list: Gif[];
}

class Home extends React.Component<RouteComponentProps<Params>, State> {
    public constructor(props: RouteComponentProps<Params>) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // State of the component
    public readonly state: Readonly<State> = {
        loading: false,
        query: '',
        list: [],
    };

    /**
     * Checks if the Gif is saved as favorite.
     * @returns {void}
     */
    public async componentDidMount(): Promise<void> {
        const { search } = this.props.match.params;
        if (search) {
            this.setState({ loading: true, query: search });
            const { gifs } = await getGifs(search);
            this.setState({ list: gifs, loading: false });
        }
    }

    private async onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        this.setState({ loading: true });
        const { gifs } = await getGifs(this.state.query);
        this.setState({ list: gifs, loading: false });
        this.props.history.replace(routes.Search.go(this.state.query));
    }

    /**
     * Handles the input change.
     * @param {React.ChangeEvent<HTMLInputElement>} e html input event.
     */
    protected onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ query: e.target.value });
    }

    /**
     * Renders the loading bars.
     * @returns {JSX.Element} html to be rendered
     */
    public renderLoading(): JSX.Element {
        return (
            <div className="bar-spinner">
                <div className="rect1" />
                <div className="rect2" />
                <div className="rect3" />
                <div className="rect4" />
                <div className="rect5" />
            </div>
        );
    }

    // Main Render Function
    public render(): JSX.Element {
        const { query, loading, list } = this.state;

        return (
            <div className="home-page">
                <form onSubmit={this.onSubmit} className="search-block">
                    <input type="text" className="input" value={query} onChange={this.onChange} placeholder="Search for Gifs . . ." />
                    <button type="submit" className="button" aria-controls="submit" aria-label="submit"><i className="fa fa-search" /></button>
                </form>

                {loading ? this.renderLoading() : <GifMosaic gifs={list} />}
            </div>
        );
    }
}

export default Home;
