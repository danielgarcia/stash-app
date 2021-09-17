import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AppFrame from './core/components/AppFrame/AppFrame';
import history from './core/history';
import FourOfour from './pages/404/404';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import GifDetails from './pages/GifDetails/GifDetails';

// This scrolls the page to the top everytime there is a change on the broweser history.
history.listen((): void => window.scrollTo(0, 0));

/**
 * Application routes.
 */
const routes = {
    Home: { route: '/' },
    Search: { route: '/search/:search', go: (search: string): string => `/search/${search}` },
    Favorites: { route: '/favorites' },
    GifDetails: { route: '/gif/:gifID', go: (gifID: string): string => `/gif/${gifID}` },
    404: { route: '/404' },
};

class Routes extends React.Component {
    public render(): JSX.Element {
        return (
            <Router history={history}>
                <AppFrame>
                    <Switch>
                        <Route exact path={routes.Home.route} component={Home} />
                        <Route exact path={routes.Search.route} component={Home} />
                        <Route exact path={routes.Favorites.route} component={Favorites} />
                        <Route exact path={routes.GifDetails.route} component={GifDetails} />
                    </Switch>
                    <Route path={routes[404].route} component={FourOfour} />
                </AppFrame>
            </Router>
        );
    }
}

export default Routes;
export { routes };
