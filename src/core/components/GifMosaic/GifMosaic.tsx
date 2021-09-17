import * as React from 'react';
import { Gif } from '../../stash/Gif';
import GifCard from './GifCard';

interface Props {
    gifs: Gif[];
}

const GifMosaic = (props: Props): JSX.Element => {
    const { gifs } = props;
    if (!gifs.length) return <></>;

    return (
        <div className="gif-mosaic">
            {gifs.map((gif, idx) => <GifCard item={gif} key={`gif-card-${idx + 1}`} />)}
        </div>
    );
};

export default GifMosaic;
