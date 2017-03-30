import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import * as _ from 'underscore';
import {debounce} from 'throttle-debounce';

interface Props {
    visitAligner: VisitAligner;
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
                            <td>
                                <ControlLabel>Next visit interval:</ControlLabel>
                            </td>
                            <td colSpan={2}>
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <button id='calendarButton' onClick={ e => this.handleCalendarButtonClick(e) } style={{ border:0 }} className='linkingButton'>
                                            <FontAwesome name='calendar' />
                                        </button>
                                    </InputGroup.Addon>
                                    <FormControl id="visitInterval" type="number" style={{width: 80}}
                                        value = { this.props.visitAligner.visitInterval }
                                        onChange = { e => this.handleVisitIntervalInputChange(e) } 
                                        min='1' max='100'/>
                                </InputGroup>
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
                                <ControlLabel>First:</ControlLabel>
                                <FormControl id="firstUpperAligner" type="number" style={{width: 60}}
                                    value = { this.props.visitAligner.firstUpperAligner }
                                    onChange = { e => this.handleFirstUpperAlignerInputChange(e) }
                                    max={ this.props.visitAligner.planUpperEnd }
                                    min={ this.props.visitAligner.previousUpper + 1 } />
                                <FormControl id="firstLowerAligner" type="number" style={{width: 60}}
                                    value = { this.props.visitAligner.firstLowerAligner }
                                    disabled = { this.props.isUpperLowerLinked}
                                    onChange = { e => this.handleFirstLowerAlignerInputChange(e) } 
                                    max={ this.props.visitAligner.planLowerEnd }
                                    min={ this.props.visitAligner.previousLower + 1 } />
                            </td>
                            <td>
                                <ControlLabel>Last:</ControlLabel>
                                <FormControl id="lastUpperAligner" type="number" style={{width: 60}}
                                    value = { this.props.visitAligner.lastUpperAligner }
                                    disabled = { this.props.isUpperLowerLinked}
                                    onChange = { e => this.handleLastUpperAlignerInputChange(e) } 
                                    max={ this.props.visitAligner.planUpperEnd }
                                    min={ this.props.visitAligner.previousUpper + 1 } />
                                <FormControl id="lastLowerAligner" type="number" style={{width: 60}}
                                    value = { this.props.visitAligner.lastLowerAligner }
                                    disabled = { this.props.isUpperLowerLinked}
                                    onChange = { e => this.handleLastLowerAlignerInputChange(e) } 
                                    max={ this.props.visitAligner.planLowerEnd }
                                    min={ this.props.visitAligner.previousLower + 1 } />
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
                        <tr>
                            <td><ControlLabel>Wear interval: </ControlLabel>
                                <button id="wearIntervalLock" onClick={ e => this.handleWearIntervalLockClick(e) } style={{ border:0 }} className='linkingButton'>
                                    <span className={this.props.wearIntervalLockedStyle} />
                                </button>
                            </td>
                            <td>
                                <FormControl id="wearInterval" type="number" style={{width: 60}}
                                    value = { this.props.visitAligner.wearInterval }
                                    disabled = { this.props.isWearIntervalLocked}
                                    onChange = { e => this.handleWearIntervalInputChange(e) } 
                                    max='100' min='1' />
                            </td>
                            <td><FormGroup><Radio name="WearIntervalUnit">Days</Radio><Radio name="WearIntervalUnit">Weeks</Radio></FormGroup></td>
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
        debounce(500, this.props.onVisitIntervalInputChange(event.target.valueAsNumber));
    }

    public handleFirstUpperAlignerInputChange(event: any) : void {
        this.props.onFirstUpperAlignerInputChange(event.target.valueAsNumber);
    }

    public handleLastUpperAlignerInputChange(event: any) : void {
        this.props.onLastUpperAlignerInputChange(event.target.valueAsNumber);
    }

    public handleFirstLowerAlignerInputChange(event: any) : void {
        this.props.onFirstLowerAlignerInputChange(event.target.valueAsNumber);
    }

    public handleLastLowerAlignerInputChange(event: any) : void {
        this.props.onLastLowerAlignerInputChange(event.target.valueAsNumber);
    }

    public handleWearIntervalInputChange(event: any) : void {
        this.props.onWearIntervalInputChange(event.target.valueAsNumber);
    }

    public handleCalendarButtonClick(event: any) : void {
        let isOpen = !this.state.calendarOpen;
        this.setState({calendarOpen : isOpen});
    }
}
