import * as React from 'react';

/**
 * Renders the loading bars.
 * @returns {JSX.Element} html to be rendered
 */
const LoadingBars = (): JSX.Element => (
    <div className="bar-spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
    </div>
);

export default LoadingBars;
