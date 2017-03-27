import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTimeout from 'react-timeout';
import AlignerVisitInterval from './AlignerVisitInterval';
import AlignerWearInterval from './AlignerWearInterval';
import AlignerNumbers from './AlignerNumbers';
import * as actions from './AlignerCalculatorAction';
import { VisitAligner } from './alignerVisitModel';
import { KnownAction } from './AlignerCalculatorAction';
import { ApplicationState }  from '../store';
import FontAwesome = require("react-fontawesome");


interface IVisitAlignerProps {
    actions: KnownAction;
    visitInterval : number;
    wearInterval : number;
    firstUpperAligner: number;
    lastUpperAligner: number;
    firstLowerAligner: number;
    lastLowerAligner: number;
    planLowerStart : number;
    planUpperStart : number;
    treatmentVisitInteval : number;
    treatmentWearInterval : number;   
    isMidTreatment : boolean;  
}

interface IVisitAlignerState {
    visitAligner: VisitAligner
}

class AlignerCalculatorContainer extends React.Component<any, any> {
    constructor(props, state) {
        super(props, state);
        debugger;
        this.state = {};
        this.state.visitAligner = {
            visitInterval : 0,
            wearInterval : 0,
            firstUpperAligner : 0,
            lastUpperAligner : 0,
            firstLowerAligner : 0,
            lastLowerAligner : 0,     
            planLowerStart : 0,
            planUpperStart : 0,
            treatmentVisitInteval : 0,
            treatmentWearInterval : 0,   
            isMidTreatment : false,    
        };
        this.handleVisitIntervalInput = this.handleVisitIntervalInput.bind(this);
        this.handleWearIntervalInput = this.handleWearIntervalInput.bind(this);
        this.handleFirstUpperInput = this.handleFirstUpperInput.bind(this);
        this.handleLastUpperInput = this.handleLastUpperInput.bind(this);
        this.handleFirstLowerInput = this.handleFirstLowerInput.bind(this);
        this.handleLastLowerInput = this.handleLastLowerInput.bind(this);
    }

    handleVisitIntervalInput(interval) {
        this.setState({visitInterval: interval});
        this.props.actions.updateAligners(this.state.visitAligner);
    }

    handleWearIntervalInput(interval) {
    }

    handleFirstUpperInput(aligner) {
    }

    handleLastUpperInput(aligner) {
    }

    handleFirstLowerInput(aligner) {
    }

    handleLastLowerInput(aligner) {
    }

    public render() {
        let boundActionCreators = this.props.actions;
        return ( 
            <div className="container-fluid">
                <div>{this.state.visitInterval} / {this.state.wearInterval}</div>
                <AlignerNumbers wearInterval={this.state.wearInterval} visitInterval={this.state.visitInterval}
                    isUpperLowerLinked={true} isVisitIntervalAlignersLinked={true} isWearIntervalLocked={true}
                    firstUpperAligner={this.state.firstUpperAligner} lastUpperAligner={this.state.lastUpperAligner} 
                    firstLowerAligner={this.state.firstLowerAligner} lastLowerAligner={this.state.lastLowerAligner}
                    onFirstUpperAlignerInputChange={this.handleFirstUpperInput}
                    onLastUpperAlignerInputChange={this.handleLastUpperInput}
                    onFirstLowerAlignerInputChange={this.handleFirstLowerInput}
                    onLastLowerAlignerInputChange={this.handleLastLowerInput} 
                    onWearIntervalInputChange={this.handleWearIntervalInput}
                    onVisitIntervalInputChange={this.handleVisitIntervalInput} />
                </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        visitAligner: state.visitAligner
    };
}

function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(actions.actionCreators, dispatch)
    };
}

 export default connect(
     (state: ApplicationState) => state.visitAligner, 
     actions.actionCreators)
     (AlignerCalculatorContainer);