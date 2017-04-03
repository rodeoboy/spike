import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import * as _ from 'underscore';
import {debounce} from 'throttle-debounce';

interface Props {
    visitAligner: VisitAligner;
    visitIntervalValidationState: string;
    wearIntervalValidationState: string;
    firstUpperAlignerValidationState: string;
    lastUpperAlignerValidationState: string;
    firstLowerAlignerValidationState: string;
    lastLowerAlignerValidationState: string;
    isUpperLowerLinked: boolean;
    isVisitIntervalAlignersLinked: boolean;
    isWearIntervalLocked: boolean;
    wearIntervalLockedStyle: string;
    visitIntervalLinkedStyle: string;
    alignerLinkedStyle: string;
    onWearIntervalInputChange: any;
    onFirstUpperAlignerInputChange;
    onLastUpperAlignerInputChange;
    onFirstLowerAlignerInputChange;
    onLastLowerAlignerInputChange;
    onVisitIntervalInputChange;
    onAlignerLinkClick;
    onVisitIntervalLinkClick;
    onWearIntervalLockClick;
}

export default class AlignerNumbers extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.handleFirstUpperAlignerInputChange = this.handleFirstUpperAlignerInputChange.bind(this);
        this.handleLastUpperAlignerInputChange = this.handleLastUpperAlignerInputChange.bind(this);
        this.handleFirstLowerAlignerInputChange = this.handleFirstLowerAlignerInputChange.bind(this);
        this.handleLastLowerAlignerInputChange = this.handleLastLowerAlignerInputChange.bind(this);
        this.handleVisitIntervalInputChange = this.handleVisitIntervalInputChange.bind(this);
        this.handleWearIntervalInputChange = this.handleWearIntervalInputChange.bind(this);
        this.handleVisitIntervalLinkClick = this.handleVisitIntervalLinkClick.bind(this);
        this.handleWearIntervalLockClick = this.handleWearIntervalLockClick.bind(this);
        this.handleAlignerLinkClick = this.handleAlignerLinkClick.bind(this);
        this.handleCalendarButtonClick = this.handleCalendarButtonClick.bind(this);
    }

    public render() {
        return (
            <div>
                <table style={{ borderSpacing : 5 }}>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <ControlLabel>Next visit:</ControlLabel>
                            </td>
                            <td colSpan={2}>
                                <FormGroup validationState={this.props.visitIntervalValidationState}>
                                    <InputGroup>
                                        <InputGroup.Addon>
                                            <button id='calendarButton' onClick={ e => this.handleCalendarButtonClick(e) } style={{ border:0 }} className='linkingButton'>
                                                <FontAwesome name='calendar' />
                                            </button>
                                        </InputGroup.Addon>
                                        <FormControl id="visitInterval" type="text" style={{width: 50}}
                                            value = { this.props.visitAligner.visitInterval }
                                            onChange = { e => this.handleVisitIntervalInputChange(e) } 
                                            maxLength='3' />
                                    </InputGroup>
                                </FormGroup>
                            </td>
                            <td>
                                <div className="floatingButton" style={{ marginBottom : -40, height : 20 }}>
                                    <div className="topLinkLine" />
                                    <button id='visitIntervalLink' onClick={ e => this.handleVisitIntervalLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                                        <span className={this.props.visitIntervalLinkedStyle} />
                                    </button>
                                    <div className="bottomLinkLine" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ControlLabel>Aligners:</ControlLabel>
                            </td>
                            <td>                                
                            </td>
                            <td>
                                <ControlLabel>First:</ControlLabel>
                                <FormGroup validationState={this.props.firstUpperAlignerValidationState}>
                                    <FormControl id="firstUpperAligner" type="text" style={{width: 50}}
                                        value = { this.props.visitAligner.firstUpperAligner }
                                        onChange = { e => this.handleFirstUpperAlignerInputChange(e) }
                                        maxLength = '3' />
                                </FormGroup>
                                <FormGroup validationState={this.props.lastLowerAlignerValidationState}>
                                    <FormControl id="firstLowerAligner" type="text" style={{width: 50}}
                                        value = { this.props.visitAligner.firstLowerAligner }
                                        disabled = { this.props.isUpperLowerLinked}
                                        onChange = { e => this.handleFirstLowerAlignerInputChange(e) } 
                                        maxLength = '3' />
                                </FormGroup>
                            </td>
                            <td>
                                <ControlLabel>Last:</ControlLabel>
                                <FormGroup validationState={this.props.firstLowerAlignerValidationState}>
                                    <FormControl id="lastUpperAligner" type="text" style={{width: 50}}
                                        value = { this.props.visitAligner.lastUpperAligner }
                                        disabled = { this.props.isUpperLowerLinked}
                                        onChange = { e => this.handleLastUpperAlignerInputChange(e) } 
                                        maxLength = '3' />  
                                </FormGroup>
                                <FormGroup validationState={this.props.lastLowerAlignerValidationState}>
                                    <FormControl id="lastLowerAligner" type="text" style={{width: 50}}
                                        value = { this.props.visitAligner.lastLowerAligner }
                                        disabled = { this.props.isUpperLowerLinked}
                                        onChange = { e => this.handleLastLowerAlignerInputChange(e) } 
                                        maxLength = '3' />
                                </FormGroup>
                            </td>
                            <td>
                                <div className="floatingButton" >
                                    <div className="topLinkLine" />
                                    <button id='alignerLink' onClick={ e => this.handleAlignerLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                                        <span className={this.props.alignerLinkedStyle} />
                                    </button>
                                    <div className="bottomLinkLine" />
                                </div>
                            </td>
                        </tr>
                        <tr colSpan={3}>
                            <td><ControlLabel>Wear interval: </ControlLabel>
                                <button id="wearIntervalLock" onClick={ e => this.handleWearIntervalLockClick(e) } style={{ border:0 }} className='linkingButton'>
                                    <span className={this.props.wearIntervalLockedStyle} />
                                </button>
                            </td>
                            <td>
                                <FormGroup validationState={this.props.wearIntervalValidationState}>
                                    <FormControl id="wearInterval" type="text" style={{width: 50}}
                                        value = { this.props.visitAligner.wearInterval }
                                        disabled = { this.props.isWearIntervalLocked}
                                        onChange = { e => this.handleWearIntervalInputChange(e) } 
                                        maxLength = '3' />
                                </FormGroup>
                            </td>
                            <td><FormGroup style={{ marginLeft : 5 }}><Radio name="WearIntervalUnit" style={{marginTop: 0}}>Days</Radio><Radio name="WearIntervalUnit">Weeks</Radio></FormGroup></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    public handleAlignerLinkClick(event: any) : void {
        event.preventDefault();
        this.props.onAlignerLinkClick();
    }

    public handleVisitIntervalLinkClick(event: any) : void {
        event.preventDefault();
        this.props.onVisitIntervalLinkClick();
    }

    public handleWearIntervalLockClick(event: any) : void {
        event.preventDefault();
        this.props.onWearIntervalLockClick();
    }

    public handleVisitIntervalInputChange(event: any) : void {
        event.persist();        
        handleNumber(event.target.value, this.props.onVisitIntervalInputChange);
    }

    public handleFirstUpperAlignerInputChange(event: any) : void {
        handleNumber(event.target.value, this.props.onFirstUpperAlignerInputChange);
    }

    public handleLastUpperAlignerInputChange(event: any) : void {
        handleNumber(event.target.value, this.props.onLastUpperAlignerInputChange);
    }

    public handleFirstLowerAlignerInputChange(event: any) : void {
        handleNumber(event.target.value, this.props.onFirstLowerAlignerInputChange);
    }

    public handleLastLowerAlignerInputChange(event: any) : void {
        handleNumber(event.target.value, this.props.onLastLowerAlignerInputChange);
    }

    public handleWearIntervalInputChange(event: any) : void {
        handleNumber(event.target.value, this.props.onWearIntervalInputChange);
    }

    public handleCalendarButtonClick(event: any) : void {
        let isOpen = !this.state.calendarOpen;
        this.setState({calendarOpen : isOpen});
    }
}

function handleNumber(value, func) {
    // Only allow numbers
    if (!isNaN(value) && parseInt(value) >= 0)
        debounce(500, func(parseInt(value)));
    // Except for blanks to allow deleting a value
    if (value == '')
        debounce(500, func(value));
}