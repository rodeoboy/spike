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

let isWearIntervalLocked = true;
let isUpperLowerAlignersLinked = true;

class AlignerCalculatorContainer extends React.Component<any, any> {
    constructor(props, state) {
        super(props, state);

        this.state = {
            visitInterval : 8,
            wearInterval : 2,
            firstUpperAligner : 1,
            lastUpperAligner : 4,
            firstLowerAligner : 1,
            lastLowerAligner : 4,     
            planLowerStart : 1,
            planUpperStart : 1,
            treatmentVisitInteval : 1,
            treatmentWearInterval : 1,   
            isMidTreatment : false,  
            wearIntervalLockedStyle: "fa fa-link"  
        };
        this.handleVisitIntervalInput = this.handleVisitIntervalInput.bind(this);
        this.handleWearIntervalInput = this.handleWearIntervalInput.bind(this);
        this.handleFirstUpperInput = this.handleFirstUpperInput.bind(this);
        this.handleLastUpperInput = this.handleLastUpperInput.bind(this);
        this.handleFirstLowerInput = this.handleFirstLowerInput.bind(this);
        this.handleLastLowerInput = this.handleLastLowerInput.bind(this);
        this.onUpperLowerAlignersLinkLinkClick = this.onUpperLowerAlignersLinkLinkClick.bind(this);
    }

    public onUpperLowerAlignersLinkLinkClick() : void {
        isUpperLowerAlignersLinked = !isUpperLowerAlignersLinked;

        if(isUpperLowerAlignersLinked) {
            this.setState({ wearIntervalLockedStyle: "fa fa-link" });
        }
        else {
            this.setState({ wearIntervalLockedStyle: "fa fa-chain-broken" });
        }
    }

    handleVisitIntervalInput(interval) {
        var aligner = Object.assign({}, this.state, {visitInterval: interval})
        this.setState(aligner);
        this.props.updateAligners(aligner);
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
                    onLinkClick={this.onUpperLowerAlignersLinkLinkClick}
                    wearIntervalLockedStyle={this.state.wearIntervalLockedStyle}
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
     (state: ApplicationState) => state, 
     actions.actionCreators)
     (AlignerCalculatorContainer);