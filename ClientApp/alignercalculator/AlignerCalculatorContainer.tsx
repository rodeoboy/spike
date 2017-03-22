import * as React from 'react';
import AlignerVisitInterval from './AlignerVisitInterval';
import AlignerWearInterval from './AlignerWearInterval';
import AlignerNumbers from './AlignerNumbers';

interface Props {
    // ...
    childern: any;
}

class AlignerCalculatorContainer extends React.Component<any, any> {
    constructor(props : Props) {
        super(props);
        this.state = {
            visitInterval : 0,
            wearInterval : 0,
            firstUpperAligner: 0,
            lastUpperAligner: 0,
            firstLowerAligner: 0,
            lastLowerAligner: 0,            
        };

        this.handleVisitIntervalInput = this.handleVisitIntervalInput.bind(this);
        this.handleWearIntervalInput = this.handleWearIntervalInput.bind(this);
        this.handleFirstUpperInput = this.handleFirstUpperInput.bind(this);
        this.handleLastUpperInput = this.handleLastUpperInput.bind(this);
        this.handleFirstLowerInput = this.handleFirstLowerInput.bind(this);
        this.handleLastLowerInput = this.handleLastLowerInput.bind(this);
    }
    
    componentDidMount() {
        this.setState({
            visitInterval : 8,
            wearInterval : 2,
            firstUpperAligner: 1,
            lastUpperAligner: 0,
            firstLowerAligner: 1,
            lastLowerAligner: 0,            
        });
    }

    handleVisitIntervalInput(interval) {
        this.setState({
            visitInterval: interval
        });
    }

    handleWearIntervalInput(interval) {
        this.setState({
            wearInterval: interval
        });
    }

    handleFirstUpperInput(aligner) {
        this.setState({
            firstUpperAligner: aligner
        });
    }

    handleLastUpperInput(aligner) {
        this.setState({
            lastUpperAligner: aligner
        });
    }

    handleFirstLowerInput(aligner) {
        this.setState({
            firstLowerAligner: aligner
        });
    }

    handleLastLowerInput(aligner) {
        this.setState({
            lastLowerAligner: aligner
        });
    }

    public render() {
        return ( 
            <div className="container-fluid">
                <div>{this.state.visitInterval} / {this.state.wearInterval}</div>
                <AlignerVisitInterval visitInterval={this.state.visitInterval} onVisitIntervalInputChange={this.handleVisitIntervalInput} />
                <AlignerNumbers 
                    firstUpperAligner={this.state.firstUpperAligner} lastUpperAligner={this.state.lastUpperAligner} 
                    firstLowerAligner={this.state.firstLowerAligner} lastLowerAligner={this.state.lastLowerAligner}
                    onFirstUpperAlignerInputChange={this.handleFirstUpperInput}
                    onLastUpperAlignerInputChange={this.handleLastUpperInput}
                    onFirstLowerAlignerInputChange={this.handleFirstLowerInput}
                    onLastLowerAlignerInputChange={this.handleLastLowerInput} />
                <AlignerWearInterval wearInterval={this.state.wearInterval} onWearIntervalInputChange={this.handleWearIntervalInput} />
            </div>
        );
    }
}

export default AlignerCalculatorContainer;