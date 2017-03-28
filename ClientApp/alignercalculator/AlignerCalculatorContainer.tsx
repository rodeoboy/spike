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
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            wearIntervalLockedStyle: "fa fa-lock",
            visitIntervalLinkedStyle: "fa fa-link", 
            alignerLinkedStyle: "fa fa-link",
            isWearIntervalLocked: true,
            isUpperLowerAlignersLinked: true,
            isVisitIntervalAlignersLinked: true
        };
        this.handleVisitIntervalInput = this.handleVisitIntervalInput.bind(this);
        this.handleWearIntervalInput = this.handleWearIntervalInput.bind(this);
        this.handleFirstUpperInput = this.handleFirstUpperInput.bind(this);
        this.handleLastUpperInput = this.handleLastUpperInput.bind(this);
        this.handleFirstLowerInput = this.handleFirstLowerInput.bind(this);
        this.handleLastLowerInput = this.handleLastLowerInput.bind(this);
        this.onUpperLowerAlignersLinkClick = this.onUpperLowerAlignersLinkClick.bind(this);
        this.onVisitIntervalLinkClick = this.onVisitIntervalLinkClick.bind(this);
        this.onWearIntervalLockClick = this.onWearIntervalLockClick.bind(this);
    }

    public onVisitIntervalLinkClick() : void {
        this.state.isVisitIntervalAlignersLinked = !this.state.isVisitIntervalAlignersLinked;

        if(this.state.isVisitIntervalAlignersLinked) {
            this.setState({ visitIntervalLinkedStyle: "fa fa-link" });
        }
        else {
            this.setState({ visitIntervalLinkedStyle: "fa fa-chain-broken" });
        }
    }

    public onUpperLowerAlignersLinkClick() : void {
        this.state.isUpperLowerAlignersLinked = !this.state.isUpperLowerAlignersLinked;

        if(this.state.isUpperLowerAlignersLinked) {
            this.setState({ alignerLinkedStyle: "fa fa-link" });
        }
        else {
            this.setState({ alignerLinkedStyle: "fa fa-chain-broken" });
        }
    }

    public onWearIntervalLockClick() : void {
        this.state.isWearIntervalLocked = !this.state.isWearIntervalLocked;

        if(this.state.isWearIntervalLocked) {
            this.setState({ wearIntervalLockedStyle: "fa fa-lock" });
        }
        else {
            this.setState({ wearIntervalLockedStyle: "fa fa-unlock" });
        }
    }

    handleVisitIntervalInput(interval) {
        debugger;
        var aligner = Object.assign({}, this.props.visitAligner, {visitInterval: interval});
        this.setState(aligner);
        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateAligners(aligner);
        else if(!this.state.isWearIntervalLocked)
            this.props.updateWearInterval(aligner);
    }

    handleWearIntervalInput(interval) {
        var aligner = Object.assign({}, this.props.visitAligner, {wearInterval: interval});
        this.setState(aligner);
        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateAligners(aligner);
        else
            this.props.updateVisitInterval(aligner);
    }

    handleFirstUpperInput(aligner) {
        var aligner = Object.assign({}, this.props.visitAligner, {firstUpperAligner: aligner});
    }

    handleLastUpperInput(aligner) {
        var aligner = Object.assign({}, this.props.visitAligner, {lastUpperAligner: aligner});
    }

    handleFirstLowerInput(aligner) {
        var aligner = Object.assign({}, this.props.visitAligner, {firstLowerAligner: aligner});
    }

    handleLastLowerInput(aligner) {
        var aligner = Object.assign({}, this.props.visitAligner, {lastUpperAligner: aligner});
    }

    public render() {
        let boundActionCreators = this.props.actions;

        return ( 
            <div className="container-fluid">
                <div>{this.state.visitInterval} / {this.state.wearInterval}</div>
                <AlignerNumbers wearInterval={this.props.visitAligner.wearInterval} visitInterval={this.props.visitAligner.visitInterval}
                    isUpperLowerLinked={this.state.isUpperLowerAlignersLinked} isVisitIntervalAlignersLinked={this.state.isVisitIntervalAlignersLinked} 
                    isWearIntervalLocked={this.state.isWearIntervalLocked}
                    firstUpperAligner={this.props.visitAligner.firstUpperAligner} lastUpperAligner={this.props.visitAligner.lastUpperAligner} 
                    firstLowerAligner={this.props.visitAligner.firstLowerAligner} lastLowerAligner={this.props.visitAligner.lastLowerAligner}
                    onAlignerLinkClick={this.onUpperLowerAlignersLinkClick}
                    onVisitIntervalLinkClick={this.onVisitIntervalLinkClick}
                    onWearIntervalLockClick={this.onWearIntervalLockClick}
                    wearIntervalLockedStyle={this.state.wearIntervalLockedStyle}
                    visitIntervalLinkedStyle={this.state.visitIntervalLinkedStyle}
                    alignerLinkedStyle={this.state.alignerLinkedStyle}
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
     mapStateToProps, 
     actions.actionCreators)
     (AlignerCalculatorContainer);