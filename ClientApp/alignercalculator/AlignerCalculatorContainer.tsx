import * as React from 'react';
import AlignerCalculator from './AlignerCalculator';

interface Props {
    // ...
    childern: any;
}

class AlignerCalculatorContainer extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.state = {visitInterval : 10}
    }
    
    public render() {
        return ( 
            <div className="container-fluid">
                <div> </div>
                <AlignerCalculator visitInterval={this.state.visitInterval} />
            </div>
        );
    }
}

export default AlignerCalculatorContainer;