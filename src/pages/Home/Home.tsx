import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getGifs } from '../../usecases/getGifs';
import { Gif } from '../../core/stash/Gif';
import GifMosaic from '../../core/components/GifMosaic/GifMosaic';
import LoadingBars from '../../core/components/LoadingBars/LoadingBars';
import { routes } from '../../Routes';

interface Params {
    search?: string;
}

interface State {
    loading: boolean;
    query: string;
    list: Gif[];
    loadingMore: boolean;
    page: number;
    moreGifsAvailable: boolean;
}

class Home extends React.Component<RouteComponentProps<Params>, State> {
    public constructor(props: RouteComponentProps<Params>) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // State of the component
    public readonly state: Readonly<State> = {
        loading: false,
        query: '',
        list: [],
        loadingMore: false,
        page: 0,
        moreGifsAvailable: true,
    };

    /**
     * Checks if the Gif is saved as favorite.
     * @returns {void}
     */
    public async componentDidMount(): Promise<void> {
        const { search } = this.props.match.params;

        window.addEventListener('scroll', this.onLoadMore);

        if (search) {
            this.setState({ loading: true, query: search });
            const { gifs } = await getGifs(search, this.state.page);
            this.setState({ list: gifs, loading: false });
        }
    }

    /**
     * Removes the window event when the component gets unmounted.
     * @returns {void}
     */
    public componentWillUnmount(): void {
        window.removeEventListener('scroll', this.onLoadMore);
    }

    /**
     * Handles the submit of the form.
     * @param {React.FormEvent<HTMLFormElement>} e html form event.
     * @returns {Promise<void>}
     */
    private async onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (this.state.loading) return;

        this.setState({ loading: true });
        const { gifs, moreGifsAvailable } = await getGifs(this.state.query, this.state.page);
        this.setState({ list: gifs, loading: false, moreGifsAvailable });
        this.props.history.replace(routes.Search.go(this.state.query));
    }

    /**
     * Handles the input change.
     * @param {React.ChangeEvent<HTMLInputElement>} e html input event.
     * @returns {void}
     */
    protected onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ query: e.target.value });
    }

    /**
     * Loads more gifs.
     * @returns {Promise<void>}
     */
    private async onLoadMore(): Promise<void> {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement?.scrollHeight && this.state.moreGifsAvailable && !this.state.loadingMore) {
            this.setState({ loadingMore: true });
            const { page, query } = this.state;
            const { gifs, error, moreGifsAvailable } = await getGifs(query, page + 1);

            if (!error) {
                this.setState((prevState: State) => {
                    const oldGifs = prevState.list;
                    const newGifs = oldGifs.concat(gifs);
                    return { ...prevState, list: newGifs, page: page + 1, loadingMore: false, moreGifsAvailable };
                });
                return;
            }

            this.setState({ loadingMore: false });
        }
    }

    // Main Render Function
    public render(): JSX.Element {
        const { query, loading, list, loadingMore, moreGifsAvailable } = this.state;

        return (
            <div className="home-page">
                <form onSubmit={this.onSubmit} className="search-block">
                    <input type="text" className="input" value={query} onChange={this.onChange} placeholder="Search for Gifs . . ." disabled={loading} />
                    <button type="submit" className="button" aria-controls="submit" aria-label="submit" disabled={loading}><i className="fa fa-search" /></button>
                </form>
                {loading ? <LoadingBars /> : <GifMosaic gifs={list} />}
                {loadingMore ? <LoadingBars /> : null}
                {!moreGifsAvailable ? <div className="no-more">End of the line. No more Gifs :(</div> : null}
            </div>
        );
    }
}

export default Home;
