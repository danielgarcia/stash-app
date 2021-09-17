import * as React from 'react';
import { Link, NavLink, RouteComponentProps } from 'react-router-dom';
import { routes } from '../../../Routes';

class Header extends React.Component<RouteComponentProps> {
    // Main Render Function
    public render(): JSX.Element {
        return (
            <header>
                <div className="logo">
                    <Link to={routes.Home.route}><img src="/images/logo.svg" alt="" /> <span className="gif-logo-text">GIFs</span></Link>
                </div>
                <ul className="nav">
                    <li>
                        <NavLink exact to={routes.Favorites.route}>My Favorites</NavLink>
                    </li>
                </ul>
            </header>
        );
    }
}

export default Header;
