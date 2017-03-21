import * as React from 'react';

export interface IAlignerVisitIntervalProps {
    visitInterval: number;
    onVisitIntervalInputChange: (event: any) => void;
}

const AlignerVisitInterval = (props: IAlignerVisitIntervalProps): JSX.Element => {

    return (
        <div>
            <div>Next visit interval:</div>
            <input
                value = { props.visitInterval }
                type="number"
                onChange = { e => props.onVisitIntervalInputChange(e) } />
        </div>
    );
};

export default AlignerVisitInterval;