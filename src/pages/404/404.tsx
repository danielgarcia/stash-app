import * as React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../Routes';

const FourOfour = (): JSX.Element => (
    <div className="four-o-four-error">
        <div className="backdrop" />
        <div className="not-found-block">
            <h3 className="four">404</h3>
            <h3>Something&apos;s Missing</h3>
            <p>This page is missing or you assembled the link incorrectly</p>
            <p>
                <Link to={routes.Home.route} className="button">
                    Go to Search Gifs
                </Link>
            </p>
        </div>
    </div>
);

export default FourOfour;
