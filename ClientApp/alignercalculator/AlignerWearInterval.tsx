import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import {handleNumber, displayIntervalInWeeks} from '../utils/intervalUtils'

interface AlignerWearIntervalProps {
    visitAligner: VisitAligner;
    wearIntervalValidationState: string;
    wearIntervalLockedStyle: string;
    isWearIntervalLocked: boolean;
    onWearIntervalInputChange: (event: any) => void;
    onWearIntervalLockClick: () => void;
    onWearIntervalUnitChange: (isInDays: boolean) => void;
}

export default class AlignerWearInterval extends React.Component<AlignerWearIntervalProps, any> {
    constructor(props : AlignerWearIntervalProps) {
        super(props);
        this.handleWearIntervalInputChange = this.handleWearIntervalInputChange.bind(this);
        this.handleWearIntervalLockClick = this.handleWearIntervalLockClick.bind(this);
    }

    public render() {
        return (
            <div className="row">
                <Col componentClass={ControlLabel} xs={5}>Wear interval: 
                    <button id="wearIntervalLock" onClick={ e => this.handleWearIntervalLockClick(e) } style={{ border:0 }} className='linkingButton'>
                        <span className={this.props.wearIntervalLockedStyle} />
                    </button>
                </Col>
                <Col componentClass={FormGroup} xs={2} validationState={this.props.wearIntervalValidationState}>
                    <FormControl id="wearInterval" type="text" style={{width: 50}}
                        value = { this.props.visitAligner.wearIntervalInDays ? this.props.visitAligner.wearInterval : displayIntervalInWeeks(this.props.visitAligner.wearInterval) }
                        disabled = { this.props.isWearIntervalLocked}
                        onChange = { e => this.handleWearIntervalInputChange(e) } 
                        maxLength = '3' />
                </Col>
                <Col xs={2} style={{ marginLeft : 5 }}>
                    <Radio name="WearIntervalUnit" id="WearIntervalDays" style={{marginTop: 0}} 
                        checked={this.props.visitAligner.wearIntervalInDays} 
                        disabled = { this.props.isWearIntervalLocked}
                        onChange={ e => this.handleWearIntervalUnitChange(e)} 
                        value="Days">Days</Radio>
                    <Radio name="WearIntervalUnit" id="WearIntervalWeeks"
                        checked={!this.props.visitAligner.wearIntervalInDays} 
                        disabled = { this.props.isWearIntervalLocked}
                        onChange={ e => this.handleWearIntervalUnitChange(e)} 
                        value="Weeks">Weeks</Radio>
                </Col>
            </div>
        );
    }

    public handleWearIntervalLockClick(event: any) : void {
        event.preventDefault();
        this.props.onWearIntervalLockClick();
    }

    public handleWearIntervalInputChange(event: any) : void {
        handleNumber(event.target.value, this.props.onWearIntervalInputChange);
    }

    public handleWearIntervalUnitChange(event: any) :void {
        let isInDays = event.target.value == "Days";
        this.props.onWearIntervalUnitChange(isInDays);
    }
}
