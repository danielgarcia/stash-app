import * as React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../Routes';
import { updateFavoriteGif } from '../../../usecases/updateFavoriteGif';
import { auth } from '../../services/auth';
import { Gif } from '../../stash/Gif';

interface Props {
    item: Gif;
}

class GifCard extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * Handles the bookmark click.
     * @param {React.MouseEvent<HTMLElement, MouseEvent>} e html click event.
     */
    protected async onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> {
        e.preventDefault();
        e.stopPropagation();
        const { item } = this.props;
        await updateFavoriteGif(item, !auth.loggedUser.favorite[item.id]);
        this.setState({});
    }

    // Main Render Function
    public render(): JSX.Element {
        const { item } = this.props;
        const isFavorite = auth.loggedUser.favorite[item.id];

        return (
            <div className="gif-card">
                <img src={item.images.original.url} alt={item.title} />
                <Link to={routes.GifDetails.go(item.id)} className="hover">
                    <i className={`favorite fa ${isFavorite ? 'fa-bookmark' : 'fa-bookmark-o'}`} onClick={this.onClick} role="button" aria-label="button" />
                </Link>
            </div>
        );
    }
}

export default GifCard;
