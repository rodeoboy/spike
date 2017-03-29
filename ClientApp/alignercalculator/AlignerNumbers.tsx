import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';

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
    }

    public render() {
        return (
            <div>
                <Form horizontal>
                <FormGroup  style={{marginBottom: 0, marginTop: 10}}>
                    <Col componentClass={ControlLabel} sm={4} md={8}>Next visit interval:</Col>
                    <Col sm={4} md={8}>
                        <InputGroup>
                            <InputGroup.Addon><FontAwesome name='calendar' /></InputGroup.Addon>
                            <FormControl id="visitInterval" type="number" style={{width: 60}}
                                value = { this.props.visitAligner.visitInterval }
                                onChange = { e => this.handleVisitIntervalInputChange(e) } 
                                min='1' max='100'/>
                        </InputGroup>
                    </Col>
                    <Col sm={2}  md={4}>
                        <div className="topLinkLine" />
                        <button id='visitIntervalLink' onClick={ e => this.handleVisitIntervalLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.visitIntervalLinkedStyle} />
                        </button>
                        <div className="bottomLinkLine" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={4} md={8} style={{marginTop: 35}}>
                        <ControlLabel>Aligners:</ControlLabel>
                    </Col>
                    <Col sm={2}  md={4}>
                        <ControlLabel>First:</ControlLabel>
                        <FormControl id="firstUpperAligner" type="number" style={{width: 60}}
                            value = { this.props.visitAligner.firstUpperAligner }
                            onChange = { e => this.handleFirstUpperAlignerInputChange(e) } />
                        <FormControl id="firstLowerAligner" type="number" style={{width: 60}}
                            value = { this.props.visitAligner.firstLowerAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleFirstLowerAlignerInputChange(e) } />
                    </Col>
                    <Col sm={2}  md={4}>
                        <ControlLabel>Last:</ControlLabel>
                        <FormControl id="lastUpperAligner" type="number" style={{width: 60}}
                            value = { this.props.visitAligner.lastUpperAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleLastUpperAlignerInputChange(e) } />
                        <FormControl id="lastLowerAligner" type="number" style={{width: 60}}
                            value = { this.props.visitAligner.lastLowerAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleLastLowerAlignerInputChange(e) } />
                    </Col>
                    <Col sm={2}  md={4} style={{marginTop: 35}}>
                        <div className="topLinkLine" />
                        <button id='alignerLink' onClick={ e => this.handleAlignerLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.alignerLinkedStyle} />
                        </button>
                        <div className="bottomLinkLine" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4} md={8}>Wear interval: 
                        <button id="wearIntervalLock" onClick={ e => this.handleWearIntervalLockClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.wearIntervalLockedStyle} />
                        </button>
                    </Col>
                    <Col sm={2}  md={4}>
                        <FormControl id="wearInterval" type="number" style={{width: 60}}
                            value = { this.props.visitAligner.wearInterval }
                            disabled = { this.props.isWearIntervalLocked}
                            onChange = { e => this.handleWearIntervalInputChange(e) } />
                    </Col>
                    <Col sm={2}  md={4}><FormGroup><Radio name="WearIntervalUnit">Days</Radio><Radio name="WearIntervalUnit">Weeks</Radio></FormGroup></Col>
                </FormGroup>
                </Form>
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
        debugger;
        this.props.onVisitIntervalInputChange(event.target.valueAsNumber);
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
}
