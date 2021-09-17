import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { routes } from '../../Routes';

class FourOfour extends React.Component<RouteComponentProps> {
    public render(): JSX.Element {
        return (
            <div className="four-o-four-error">
                <div className="backdrop" />
                <div className="not-found-block">
                    <h3 className="four">404</h3>
                    <h3>Something&apos;s Missing</h3>
                    <p>This page is missing or you assembled the link incorrectly</p>
                    <p>
                        <Link to={routes.Home.route} className="button button-white">
                            Go to Dashboard
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default FourOfour;
