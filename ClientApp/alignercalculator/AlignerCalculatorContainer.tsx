import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTimeout from 'react-timeout';
import AlignerVisitInterval from './AlignerVisitInterval';
import AlignerWearInterval from './AlignerWearInterval';
import AlignerNumbers from './AlignerNumbers';
import * as actions from './AlignerCalculatorAction';
import { VisitAligner, AlignerProps } from './alignerVisitModel';
import { KnownAction } from './AlignerCalculatorAction';
import { ApplicationState }  from '../store';
import FontAwesome = require("react-fontawesome");

class AlignerCalculatorContainer extends React.Component<AlignerProps, any> {
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

    public handleVisitIntervalInput(interval) {
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
        this.props.updateAligners(aligner);
    }

    handleFirstUpperInput(alignerNumber) {
        var aligner = Object.assign({}, this.props.visitAligner, {firstUpperAligner: alignerNumber});
        this.setState(aligner);

        if(this.state.isUpperLowerAlignersLinked) 
            this.props.updateAligners(aligner);
        else
            this.props.updateUpperAligners(aligner);
    }

    handleLastUpperInput(alignerNumber) {
        var aligner = Object.assign({}, this.props.visitAligner, {lastUpperAligner: alignerNumber});
        this.setState(aligner);
        
        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateVisitInterval(aligner);
        else if(!this.state.isWearIntervalLocked)
            this.props.updateWearInterval(aligner);
    }

    handleFirstLowerInput(alignerNumber) {
        var aligner = Object.assign({}, this.props.visitAligner, {firstLowerAligner: alignerNumber});
        this.setState(aligner);
        
        if(this.state.isUpperLowerAlignersLinked) 
            this.props.updateAligners(aligner);
        else
            this.props.updateLowerAligners(aligner);
    }

    handleLastLowerInput(alignerNumber) {
        var aligner = Object.assign({}, this.props.visitAligner, {lastUpperAligner: alignerNumber});
        this.setState(aligner);
        
        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateVisitInterval(aligner);
        else if(!this.state.isWearIntervalLocked)
            this.props.updateWearInterval(aligner);
    }

    public render() {

        return ( 
            <div className="container-fluid">
                <div>{this.state.visitInterval} / {this.state.wearInterval}</div>
                <AlignerNumbers visitAligner={this.props.visitAligner}
                    isUpperLowerLinked={this.state.isUpperLowerAlignersLinked} 
                    isVisitIntervalAlignersLinked={this.state.isVisitIntervalAlignersLinked} 
                    isWearIntervalLocked={this.state.isWearIntervalLocked}
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