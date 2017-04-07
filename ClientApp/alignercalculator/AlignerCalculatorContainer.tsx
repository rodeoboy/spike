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
import { MidTreatmentModal } from './MidTreatmentModal';
import ErrorPanel from '../shared/ErrorPanel';
import { ApplicationState }  from '../store';
import { roundDaysToNearestWeek } from '../utils/intervalUtils'
import FontAwesome = require("react-fontawesome");
import * as revalidator from 'revalidator'
import * as moment from 'moment';

const now = moment();
const format = 'YYYY-MM-DD';

export class AlignerCalculatorContainer extends React.Component<AlignerProps, any> {
    constructor(props, context) {
        super(props, context);
        let currentDate = now.clone();
        
        this.state = {
            nextVisitDate: currentDate.add(this.props.visitAligner.visitInterval + 1, 'day'),
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
            openMidTreatment: false,
            isMidTreatment: false,
            ErrorMessages: []
        };
        this.handleVisitIntervalInput = this.handleVisitIntervalInput.bind(this);
        this.handleVisitIntervalUnitChange = this.handleVisitIntervalUnitChange.bind(this);
        this.handleWearIntervalInput = this.handleWearIntervalInput.bind(this);
        this.handleWearIntervalUnitChange = this.handleWearIntervalUnitChange.bind(this);        
        this.handleFirstUpperInput = this.handleFirstUpperInput.bind(this);
        this.handleLastUpperInput = this.handleLastUpperInput.bind(this);
        this.handleFirstLowerInput = this.handleFirstLowerInput.bind(this);
        this.handleLastLowerInput = this.handleLastLowerInput.bind(this);
        this.onUpperLowerAlignersLinkClick = this.onUpperLowerAlignersLinkClick.bind(this);
        this.onVisitIntervalLinkClick = this.onVisitIntervalLinkClick.bind(this);
        this.handleVisitDateChange = this.handleVisitDateChange.bind(this);
        this.onWearIntervalLockClick = this.onWearIntervalLockClick.bind(this);
        this.handleMidTreatmentClose = this.handleMidTreatmentClose.bind(this);
        this.handleMidTreatmentContinue = this.handleMidTreatmentContinue.bind(this);
    }

    public render() {

        return ( 
            <div style={{width: 380, marginTop: 20}}>
                <AlignerVisitInterval visitAligner={this.props.visitAligner}
                    onVisitIntervalUnitChange={this.handleVisitIntervalUnitChange}
                    nextVisitDate={this.state.nextVisitDate}
                    visitIntervalValidationState={this.state.visitIntervalValidationState}
                    onVisitIntervalInputChange={this.handleVisitIntervalInput} 
                    isVisitIntervalAlignersLinked={this.state.isVisitIntervalAlignersLinked} 
                    onVisitIntervalLinkClick={this.onVisitIntervalLinkClick}
                    onVisitDateChange={this.handleVisitDateChange}
                    visitIntervalLinkedStyle={this.state.visitIntervalLinkedStyle}/>
                <AlignerNumbers visitAligner={this.props.visitAligner}
                    firstUpperAlignerValidationState={this.state.firstUpperAlignerValidationState}
                    lastUpperAlignerValidationState={this.state.lastUpperAlignerValidationState}
                    firstLowerAlignerValidationState={this.state.firstLowerAlignerValidationState}
                    lastLowerAlignerValidationState={this.state.lastLowerAlignerValidationState}
                    isUpperLowerLinked={this.state.isUpperLowerAlignersLinked} 
                    onAlignerLinkClick={this.onUpperLowerAlignersLinkClick}
                    alignerLinkedStyle={this.state.alignerLinkedStyle}
                    onFirstUpperAlignerInputChange={this.handleFirstUpperInput}
                    onLastUpperAlignerInputChange={this.handleLastUpperInput}
                    onFirstLowerAlignerInputChange={this.handleFirstLowerInput}
                    onLastLowerAlignerInputChange={this.handleLastLowerInput}/>
                <AlignerWearInterval visitAligner={this.props.visitAligner}
                    onWearIntervalUnitChange={this.handleWearIntervalUnitChange}
                    onWearIntervalInputChange={this.handleWearIntervalInput} 
                    wearIntervalValidationState={this.state.wearIntervalValidationState}
                    isWearIntervalLocked={this.state.isWearIntervalLocked}
                    onWearIntervalLockClick={this.onWearIntervalLockClick}
                    wearIntervalLockedStyle={this.state.wearIntervalLockedStyle} />
                <ErrorPanel messages={this.state.ErrorMessages} />
                <MidTreatmentModal showModal={this.state.openMidTreatment } onClose={this.handleMidTreatmentClose} onContinue={this.handleMidTreatmentContinue}/>
            </div>
        );
    }

    public handleMidTreatmentClose() : void {
        let aligners = Object.assign({}, this.props.visitAligner, {firstUpperAligner: this.props.visitAligner.previousUpper + 1, firstLowerAligner: this.props.visitAligner.previousLower + 1});
    
        this.setState(aligners);
        this.props.updateAligners(aligners);
        this.setState({ openMidTreatment: !this.state.openMidTreatment });
        this.setState({ isMidTreatment: false});
    }

    public handleMidTreatmentContinue() : void {
        this.setState({ openMidTreatment: !this.state.openMidTreatment });
        this.setState({ isMidTreatment: true});
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
            //if wear interval is locked then visit interval and alingers should be link
            //to ensure that updates fires a calculation
            if(!this.state.isVisitIntervalAlignersLinked) this.onVisitIntervalLinkClick();
        }
        else {
            this.setState({ wearIntervalLockedStyle: "fa fa-unlock" });
        }
    }

    public handleVisitDateChange(value: Date) {
        let visitDate = moment(value);
        let interval = visitDate.diff(now, 'days') - 1;
        if (!this.props.visitAligner.visitIntervalInDays) interval = roundDaysToNearestWeek(interval)/7;

        this.handleVisitIntervalInput(interval);
    }

    public handleVisitIntervalInput(interval : number) {
        // If the interval is displayed in weeks convert value back to days for calcuations
        if (!this.props.visitAligner.visitIntervalInDays) interval *= 7;
        let aligner = Object.assign({}, this.props.visitAligner, { visitInterval: interval });
        let validation = validateVisitInterval(aligner);
        let currentDate = now.clone();
        let nextVisitDate = currentDate.add(interval + 1, 'day');
        this.setState(aligner);
        this.setState({nextVisitDate: nextVisitDate});

        if(this.state.isVisitIntervalAlignersLinked)
            this.props.updateAligners(aligner);
        else if(!this.state.isWearIntervalLocked)
            this.props.updateWearInterval(aligner);

        this.state.visitIntervalValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleVisitIntervalUnitChange(isInDays) {
        var interval = isInDays ? this.props.visitAligner.visitInterval : roundDaysToNearestWeek(this.props.visitAligner.visitInterval);
        let aligner = Object.assign({}, this.props.visitAligner, { visitIntervalInDays: isInDays, visitInterval: interval });
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
        if (!this.props.visitAligner.wearIntervalInDays) interval *= 7;
        let aligner = Object.assign({}, this.props.visitAligner, { wearInterval: interval });
        let validation = validateWearInterval(aligner);
        this.setState(aligner);
        this.props.updateAligners(aligner);

        this.state.wearIntervalValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleWearIntervalUnitChange(isInDays) {
        var interval = isInDays ? this.props.visitAligner.wearInterval : roundDaysToNearestWeek(this.props.visitAligner.wearInterval);
        let aligner = Object.assign({}, this.props.visitAligner, { wearIntervalInDays: isInDays, wearInterval: interval });
        let validation = validateWearInterval(aligner);
        this.setState(aligner);
        this.props.updateAligners(aligner);
        
        this.state.wearIntervalValidationState = validation.valid ? null : "error";
        this.state.ErrorMessages = validation.errors;
    }

    handleFirstUpperInput(alignerNumber : number) {
        let validation;
        // If this is the first visit verify if mid treatment patient
        if(alignerNumber > this.props.visitAligner.planUpperStart && !this.state.isMidTreatment &&
            this.props.visitAligner.planUpperStart === this.props.visitAligner.previousUpper + 1 ) {            
            this.setState({openMidTreatment : true});
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
        // If this is the first visit verify if mid treatment patient
        if(alignerNumber > this.props.visitAligner.planLowerStart && !this.state.isMidTreatment &&
            this.props.visitAligner.planLowerStart === this.props.visitAligner.previousLower + 1 ) {            
            this.setState({openMidTreatment : true});
        }
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
}

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
                minimum : visitAligner.previousUpper == 0? visitAligner.planUpperStart : visitAligner.previousUpper + 1,
                maximum : visitAligner.previousUpper == 0? visitAligner.planUpperEnd : visitAligner.previousUpper + 1,
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
                minimum : visitAligner.previousLower == 0? visitAligner.planLowerStart : visitAligner.previousLower + 1,
                maximum : visitAligner.previousLower == 0? visitAligner.planLowerEnd : visitAligner.previousLower + 1,
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
                allowEmpty : !(visitAligner.firstUpperAligner > 0),
                minimum : visitAligner.previousUpper == 0? visitAligner.planUpperStart : visitAligner.previousUpper + 1,
                maximum : visitAligner.planUpperEnd,
                messages : {
                    minimum : "Last upper aligner can not be less than the plan start or last alinger given",
                    maximum : "Last upper aligner can not be greater than the plan end",
                    allowEmpty : "Last upper aligner can not be empty if first upper aligner has a value"
                }
            }
        }
    });
}

function validateLastLower(visitAligner : VisitAligner) {
    return revalidator.validate(visitAligner, {
        properties : {
            lastLowerAligner : {
                allowEmpty : !(visitAligner.firstLowerAligner > 0),
                minimum : visitAligner.previousLower == 0? visitAligner.planLowerStart : visitAligner.previousLower + 1,
                maximum : visitAligner.planLowerEnd,
                messages : {
                    minimum : "Last lower aligner can not be less than the plan start or last alinger given",
                    maximum : "Last lower aligner can not be greater than the plan end",
                    allowEmpty : "Last lower aligner can not be empty if first lower aligner has a value"
                }
            }
        }
    });
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