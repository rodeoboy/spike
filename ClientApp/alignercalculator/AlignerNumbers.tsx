import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");

interface Props {
    visitInterval: number;
    firstUpperAligner: number;
    lastUpperAligner: number;
    firstLowerAligner: number;
    lastLowerAligner: number;
    wearInterval: number;
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
                    <Col componentClass={ControlLabel} sm={2} md={2}>Next visit interval:</Col>
                    <Col sm={2} md={2}>
                        <InputGroup>
                            <InputGroup.Addon><FontAwesome name='calendar' /></InputGroup.Addon>
                            <FormControl id="visitInterval" type="number" style={{width: 60}}
                                value = { this.props.visitInterval }
                                onChange = { e => this.handleVisitIntervalInputChange(e) } />
                        </InputGroup>
                    </Col>
                    <Col sm={1}  md={1}>
                        <div className="topLinkLine" />
                        <button onClick={ e => this.handleVisitIntervalLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.visitIntervalLinkedStyle} />
                        </button>
                        <div className="bottomLinkLine" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} md={2} style={{marginTop: 35}}>
                        <ControlLabel>Aligners:</ControlLabel>
                    </Col>
                    <Col sm={1} md={1}>
                        <ControlLabel>First:</ControlLabel>
                        <FormControl type="number" style={{width: 60}}
                            value = { this.props.firstUpperAligner }
                            onChange = { e => this.handleFirstUpperAlignerInputChange(e) } />
                        <FormControl type="number" style={{width: 60}}
                            value = { this.props.firstLowerAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleFirstLowerAlignerInputChange(e) } />
                    </Col>
                    <Col sm={1} md={1} >
                        <ControlLabel>Last:</ControlLabel>
                        <FormControl type="number" style={{width: 60}}
                            value = { this.props.lastUpperAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleLastUpperAlignerInputChange(e) } />
                        <FormControl type="number" style={{width: 60}}
                            value = { this.props.lastLowerAligner }
                            disabled = { this.props.isUpperLowerLinked}
                            onChange = { e => this.handleLastLowerAlignerInputChange(e) } />
                    </Col>
                    <Col sm={1} md={1} style={{marginTop: 35}}>
                        <div className="topLinkLine" />
                        <button onClick={ e => this.handleAlignerLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.alignerLinkedStyle} />
                        </button>
                        <div className="bottomLinkLine" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2} md={2}>Wear interval: 
                        <button onClick={ e => this.handleWearIntervalLockClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.wearIntervalLockedStyle} />
                        </button>
                    </Col>
                    <Col sm={1} md={1}>
                        <FormControl type="number" style={{width: 60}}
                            value = { this.props.wearInterval }
                            disabled = { this.props.isWearIntervalLocked}
                            onChange = { e => this.handleWearIntervalInputChange(e) } />
                    </Col>
                    <Col sm={1} md={1}><FormGroup><Radio>Days</Radio><Radio>Weeks</Radio></FormGroup></Col>
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
        this.props.onVisitIntervalInputChange(event.target.value);
    }

    public handleFirstUpperAlignerInputChange(event: any) : void {
        this.props.onFirstUpperAlignerInputChange(event.target.value);
    }

    public handleLastUpperAlignerInputChange(event: any) : void {
        this.props.onLastUpperAlignerInputChange(event.target.value);
    }

    public handleFirstLowerAlignerInputChange(event: any) : void {
        this.props.onFirstLowerAlignerInputChange(event.target.value);
    }

    public handleLastLowerAlignerInputChange(event: any) : void {
        this.props.onLastLowerAlignerInputChange(event.target.value);
    }
    public handleWearIntervalInputChange(event: any) : void {
        this.props.onWearIntervalInputChange(event.target.value);
    }
}
