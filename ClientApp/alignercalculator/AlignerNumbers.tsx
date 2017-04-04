import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import * as _ from 'underscore';
import {debounce} from 'throttle-debounce';

interface Props {
    visitAligner: VisitAligner;
    firstUpperAlignerValidationState: string;
    lastUpperAlignerValidationState: string;
    firstLowerAlignerValidationState: string;
    lastLowerAlignerValidationState: string;
    isUpperLowerLinked: boolean;
    alignerLinkedStyle: string;
    onFirstUpperAlignerInputChange;
    onLastUpperAlignerInputChange;
    onFirstLowerAlignerInputChange;
    onLastLowerAlignerInputChange;
    onAlignerLinkClick;
}

export default class AlignerNumbers extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.handleFirstUpperAlignerInputChange = this.handleFirstUpperAlignerInputChange.bind(this);
        this.handleLastUpperAlignerInputChange = this.handleLastUpperAlignerInputChange.bind(this);
        this.handleFirstLowerAlignerInputChange = this.handleFirstLowerAlignerInputChange.bind(this);
        this.handleLastLowerAlignerInputChange = this.handleLastLowerAlignerInputChange.bind(this);
        this.handleAlignerLinkClick = this.handleAlignerLinkClick.bind(this);
    }

    public render() {
        return (
            <div>
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
            </div>
        );
    }

    public handleAlignerLinkClick(event: any) : void {
        event.preventDefault();
        this.props.onAlignerLinkClick();
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
}

function handleNumber(value, func) {
    // Only allow numbers
    if (!isNaN(value) && parseInt(value) >= 0)
        debounce(500, func(parseInt(value)));
    // Except for blanks to allow deleting a value
    if (value == '')
        debounce(500, func(value));
}