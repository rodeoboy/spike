import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import * as _ from 'underscore';
import {handleNumber} from '../utils/intervalUtils'

interface AlignerNumbersProps {
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

export default class AlignerNumbers extends React.Component<AlignerNumbersProps, any> {
    constructor(props : AlignerNumbersProps) {
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
                <Row><Col componentClass={ControlLabel} xs={5}></Col><Col componentClass={ControlLabel} xs={2}>First:</Col><Col componentClass={ControlLabel} xs={2}>Last:</Col></Row>
                <Row>
                    <Col componentClass={ControlLabel} xs={5}>Aligners:</Col>
                    <Col componentClass={FormGroup} xs={2} validationState={this.props.firstUpperAlignerValidationState}>
                        <FormControl id="firstUpperAligner" type="text" style={{width: 50}}
                            value = { this.props.visitAligner.firstUpperAligner }
                            onChange = { e => this.handleFirstUpperAlignerInputChange(e) }
                            maxLength = '3' />
                    </Col>
                    <Col componentClass={FormGroup} xs={2} validationState={this.props.lastUpperAlignerValidationState}>
                        <FormControl id="lastUpperAligner" type="text" style={{width: 50}}
                            value = { this.props.visitAligner.lastUpperAligner === 0 ? '' : this.props.visitAligner.lastUpperAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleLastUpperAlignerInputChange(e) } 
                            maxLength = '3' /> 
                    </Col>
                    </Row>
                <Row>
                    <Col componentClass={ControlLabel} xs={5}></Col>
                    <Col componentClass={FormGroup} xs={2} validationState={this.props.firstLowerAlignerValidationState}>
                        <FormControl id="firstLowerAligner" type="text" style={{width: 50}}
                            value = { this.props.visitAligner.firstLowerAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleFirstLowerAlignerInputChange(e) } 
                            maxLength = '3' />
                    </Col>
                    <Col componentClass={FormGroup} xs={2} validationState={this.props.lastLowerAlignerValidationState}>
                        <FormControl id="lastLowerAligner" type="text" style={{width: 50}}
                            value = { this.props.visitAligner.lastLowerAligner === 0 ? '' : this.props.visitAligner.lastLowerAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleLastLowerAlignerInputChange(e) } 
                            maxLength = '3' />
                    </Col>
                    <Col xs={2} style={{marginTop: -30 }} >
                        <div className="topLinkLine" />
                        <button id='alignerLink' onClick={ e => this.handleAlignerLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.alignerLinkedStyle} />
                        </button>
                        <div className="bottomLinkLine" />
                    </Col>
                </Row>
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
