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
import ErrorPanel from './ErrorPanel';
import { ApplicationState }  from '../store';
import FontAwesome = require("react-fontawesome");
import * as revalidator from 'revalidator'

function validateVisitInterval(visitAligner : VisitAligner) {
    return revalidator.validate(visitAligner, {
        properties : {
            visitInterval : {
                require : true,
                type : 'number',
                minimum : visitAligner.wearInterval,
                maximum : 999,
                messages : {
                    maximum : "Visit interval must be less than 1000",
                    minimum : "Visit interval can not be less than wear interval",
                    type : "Visit interval must be a number"
                }
            }
        }
    });
}

function validateWearInterval(visitAligner : VisitAligner) {
    return revalidator.validate(visitAligner, {
        properties : {
            wearInterval : {
                require : true,
                type : 'number',
                minimum : 1,
                maximum : visitAligner.visitInterval,
                messages : {
                    maximum : "Wear interval can not be greater than visit interval",
                    minimum : "Wear interval must be greater than or equal to 1",
                    type : "Wear interval must be a number"
                }
            }
        }
    });
}

function validateFirstUpper(visitAligner : VisitAligner) {
    return revalidator.validate(visitAligner, {
        properties : {
            firstUpperAligner : {
                require : true,
                minimum : visitAligner.previousUpper == 0? visitAligner.planUpperStart : visitAligner.previousUpper,
                maximum : visitAligner.planUpperEnd,
                messages : {
                    minimum : "First upper aligner can not be less than the plan start or last alinger given",
                    maximum : "First upper aligner can not be greater than the plan end"
                }
            }
        }
    });
}

function validateFirstLower(visitAligner : VisitAligner) {
    return revalidator.validate(visitAligner, {
        properties : {
            firstLowerAligner : {
                require : true,
                minimum : visitAligner.previousLower == 0? visitAligner.planLowerStart : visitAligner.previousLower,
                maximum : visitAligner.planLowerEnd,
                messages : {
                    minimum : "First lower aligner can not be less than the plan start or last alinger given",
                    maximum : "First lower aligner can not be greater than the plan end"
                }
            }
        }
    });
}

function validateLastUpper(visitAligner : VisitAligner) {
    return revalidator.validate(visitAligner, {
        properties : {
            lastUpperAligner : {
                require : true,
                minimum : visitAligner.previousUpper == 0? visitAligner.planUpperStart : visitAligner.previousUpper,
                maximum : visitAligner.planUpperEnd,
                messages : {
                    minimum : "Last upper aligner can not be less than the plan start or last alinger given",
                    maximum : "Last upper aligner can not be greater than the plan end"
                }
            }
        }
    });
}

function validateLastLower(visitAligner : VisitAligner) {
    return revalidator.validate(visitAligner, {
        properties : {
            lastLowerAligner : {
                require : true,
                minimum : visitAligner.previousLower == 0? visitAligner.planLowerStart : visitAligner.previousLower,
                maximum : visitAligner.planLowerEnd,
                messages : {
                    minimum : "Last lower aligner can not be less than the plan start or last alinger given",
                    maximum : "Last lower aligner can not be greater than the plan end"
                }
            }
        }
    });
}

class AlignerCalculatorContainer extends React.Component<AlignerProps, any> {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            wearIntervalLockedStyle: "fa fa-lock",
            visitIntervalLinkedStyle: "fa fa-link", 
            alignerLinkedStyle: "fa fa-link",
            isWearIntervalLocked: true,
            isUpperLowerAlignersLinked: true,
            isVisitIntervalAlignersLinked: true,
            visitIntervalValidationState: null,
            wearIntervalValidationState: null,
            firstUpperAlignerValidationState: null,
            lastUpperAlignerValidationState: null,
            firstLowerAlignerValidationState: null,
            lastLowerAlignerValidationState: null,
            ErrorMessages: []
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
            // If visit interval and aligners are unlinked then wear interval should be unlocked 
            // so changes calculate new wear interval value
            if(this.state.isWearIntervalLocked) this.onWearIntervalLockClick();
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

    public handleVisitIntervalInput(interval : number) {
        let aligner = Object.assign({}, this.props.visitAligner, { visitInterval: interval });
        let validation = validateVisitInterval(aligner);
        this.setState(aligner);
        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateAligners(aligner);
        else if(!this.state.isWearIntervalLocked)
            this.props.updateWearInterval(aligner);

        this.state.visitIntervalValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleWearIntervalInput(interval : number) {
        let aligner = Object.assign({}, this.props.visitAligner, { wearInterval: interval });
        let validation = validateWearInterval(aligner);
        this.setState(aligner);
        this.props.updateAligners(aligner);

        this.state.wearIntervalValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleFirstUpperInput(alignerNumber : number) {
        let validation;
        // Should do this on blur/enter to make sure user is complete with the update
        if(alignerNumber > this.props.visitAligner.previousLower) {
            this.state.openMidTreatment = true;
        }

        if(this.state.isUpperLowerAlignersLinked) {
            let alignerLower = Object.assign({}, this.props.visitAligner, {firstUpperAligner: alignerNumber, firstLowerAligner: alignerNumber});
            validation = validateFirstUpper(alignerLower);
            this.setState(alignerLower);
            this.props.updateAligners(alignerLower);
            }
        else {
            let aligner = Object.assign({}, this.props.visitAligner, {firstUpperAligner: alignerNumber});
            validation = validateFirstUpper(aligner);
            this.setState(aligner);
            this.props.updateUpperAligners(aligner);
        }

        this.state.firstUpperAlignerValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleLastUpperInput(alignerNumber : number) {
        let aligner = Object.assign({}, this.props.visitAligner, {lastUpperAligner: alignerNumber});
        let validation = validateLastUpper(aligner);
        
        this.setState(aligner);
        
        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateVisitInterval(aligner);
        else if(!this.state.isWearIntervalLocked)
            this.props.updateWearInterval(aligner);
            
        this.state.lastUpperAlignerValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleFirstLowerInput(alignerNumber : number) {
        let aligner = Object.assign({}, this.props.visitAligner, {firstLowerAligner: alignerNumber});
        let validation = validateFirstLower(aligner);
        this.setState(aligner);
        
        this.props.updateLowerAligners(aligner);

        this.state.firstLowerAlignerValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleLastLowerInput(alignerNumber : number) {
        let aligner = Object.assign({}, this.props.visitAligner, {lastLowerAligner: alignerNumber});
        let validation = validateLastLower(aligner);
        this.setState(aligner);
        
        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateVisitInterval(aligner);
        else if(!this.state.isWearIntervalLocked)
            this.props.updateWearInterval(aligner);
            
        this.state.lastLowerAlignerValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    public render() {

        return ( 
            <div className="container-fluid">
                <div>{this.state.visitInterval} / {this.state.wearInterval}</div>
                <AlignerNumbers visitAligner={this.props.visitAligner}
                    visitIntervalValidationState={this.state.visitIntervalValidationState}
                    wearIntervalValidationState={this.state.wearIntervalValidationState}
                    firstUpperAlignerValidationState={this.state.firstUpperAlignerValidationState}
                    lastUpperAlignerValidationState={this.state.lastUpperAlignerValidationState}
                    firstLowerAlignerValidationState={this.state.firstLowerAlignerValidationState}
                    lastLowerAlignerValidationState={this.state.lastLowerAlignerValidationState}
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
                    onVisitIntervalInputChange={this.handleVisitIntervalInput}  />
                <ErrorPanel messages={this.state.ErrorMessages} />
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