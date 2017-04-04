import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import {debounce} from 'throttle-debounce';

interface Props {
    wearInterval: number;
    wearIntervalValidationState: string;
    wearIntervalLockedStyle: string;
    isWearIntervalLocked: boolean;
    onWearIntervalInputChange: (event: any) => void;
    onWearIntervalLockClick : () => void;
}

export default class AlignerWearInterval extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.handleWearIntervalInputChange = this.handleWearIntervalInputChange.bind(this);
        this.handleWearIntervalLockClick = this.handleWearIntervalLockClick.bind(this);
    }

    public render() {
        return (
            <div>
                <tr colSpan={3}>
                    <td><ControlLabel>Wear interval: </ControlLabel>
                        <button id="wearIntervalLock" onClick={ e => this.handleWearIntervalLockClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.wearIntervalLockedStyle} />
                        </button>
                    </td>
                    <td>
                        <FormGroup validationState={this.props.wearIntervalValidationState}>
                            <FormControl id="wearInterval" type="text" style={{width: 50}}
                                value = { this.props.wearInterval }
                                disabled = { this.props.isWearIntervalLocked}
                                onChange = { e => this.handleWearIntervalInputChange(e) } 
                                maxLength = '3' />
                        </FormGroup>
                    </td>
                    <td><FormGroup style={{ marginLeft : 5 }}><Radio name="WearIntervalUnit" style={{marginTop: 0}}>Days</Radio><Radio name="WearIntervalUnit">Weeks</Radio></FormGroup></td>
                </tr>
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