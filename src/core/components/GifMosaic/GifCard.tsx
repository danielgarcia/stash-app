import * as React from 'react';
import { Link } from 'react-router-dom';
import { Gif } from '../../stash/Gif';
import { routes } from '../../../Routes';
import { updateFavoriteGif } from '../../../usecases/updateFavoriteGif';
import { auth } from '../../services/auth';

interface State {
    favorite: boolean;
}

interface Props {
    item: Gif;
}

class GifCard extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    // State of the component
    public readonly state: Readonly<State> = {
        favorite: false,
    };

    /**
     * Checks if the Gif is saved as favorite.
     * @returns {void}
     */
    public async componentDidMount(): Promise<void> {
        const { item } = this.props;
        if (auth.loggedUser.favorite[item.id]) this.setState({ favorite: true });
    }

    /**
     * Handles the bookmark click.
     * @param {React.MouseEvent<HTMLElement, MouseEvent>} e html click event.
     */
    protected async onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> {
        e.preventDefault();
        e.stopPropagation();
        const { item } = this.props;
        const { favorite } = this.state;
        await updateFavoriteGif(item, !favorite);
        this.setState({ favorite: !favorite });
    }

    // Main Render Function
    public render(): JSX.Element {
        const { favorite } = this.state;
        const { item } = this.props;

        return (
            <div className="gif-card">
                <img src={item.images.original.url} alt={item.title} />
                <Link to={routes.GifDetails.go(item.id)} className="hover">
                    <i className={`favorite fa ${favorite ? 'fa-bookmark' : 'fa-bookmark-o'}`} onClick={this.onClick} role="button" aria-label="button" />
                </Link>
            </div>
        );
    }
}

export default GifCard;
