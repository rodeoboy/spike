import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import {debounce} from 'throttle-debounce';

interface AlignerWearIntervalProps {
    wearInterval: number;
    wearIntervalValidationState: string;
    wearIntervalLockedStyle: string;
    isWearIntervalLocked: boolean;
    onWearIntervalInputChange: (event: any) => void;
    onWearIntervalLockClick : () => void;
}

export default class AlignerWearInterval extends React.Component<AlignerWearIntervalProps, any> {
    constructor(props : AlignerWearIntervalProps) {
        super(props);
        this.handleWearIntervalInputChange = this.handleWearIntervalInputChange.bind(this);
        this.handleWearIntervalLockClick = this.handleWearIntervalLockClick.bind(this);
    }

    public render() {
        return (
            <div className="form-group row">
                <Col componentClass={ControlLabel} xs={5}>Wear interval: 
                    <button id="wearIntervalLock" onClick={ e => this.handleWearIntervalLockClick(e) } style={{ border:0 }} className='linkingButton'>
                        <span className={this.props.wearIntervalLockedStyle} />
                    </button>
                </Col>
                <Col componentClass={FormGroup} xs={3} validationState={this.props.wearIntervalValidationState}>
                    <FormControl id="wearInterval" type="text" style={{width: 50}}
                        value = { this.props.wearInterval }
                        disabled = { this.props.isWearIntervalLocked}
                        onChange = { e => this.handleWearIntervalInputChange(e) } 
                        maxLength = '3' />
                </Col>
                <Col componentClass={FormGroup} xs={2} style={{ marginLeft : 5 }}><Radio name="WearIntervalUnit" style={{marginTop: 0}}>Days</Radio><Radio name="WearIntervalUnit">Weeks</Radio></Col>
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
}

function handleNumber(value, func) {
    // Only allow numbers
    if (!isNaN(value) && parseInt(value) >= 0)
        debounce(500, func(parseInt(value)));
    // Except for blanks to allow deleting a value
    if (value == '')
        debounce(500, func(value));
}