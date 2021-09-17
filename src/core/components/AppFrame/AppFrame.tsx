import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Header from '../Header/Header';

class AppFrame extends React.Component<RouteComponentProps> {
    public constructor(props: RouteComponentProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className="app-frame wrapper">
                <Header history={this.props.history} location={this.props.location} match={this.props.match} />
                <div className="app-content">{this.props.children}</div>
            </div>
        );
    }
}

export default withRouter(AppFrame);
