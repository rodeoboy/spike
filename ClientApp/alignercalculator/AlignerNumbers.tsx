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
    //upperLowerLinkedStyle: string;
    //vistiIntervalAlignerLinkedStyle: string;
    //wearIntervalLockedStyle: string;
    onWearIntervalInputChange: any;
    onFirstUpperAlignerInputChange;
    onLastUpperAlignerInputChange;
    onFirstLowerAlignerInputChange;
    onLastLowerAlignerInputChange;
    onVisitIntervalInputChange;
}

export default class AlignerNumbers extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.handleFirstUpperAlignerInputChange = this.handleFirstUpperAlignerInputChange.bind(this);
        this.handleLastUpperAlignerInputChange = this.handleLastUpperAlignerInputChange.bind(this);
        this.handleFirstLowerAlignerInputChange = this.handleFirstLowerAlignerInputChange.bind(this);
        this.handleLastLowerAlignerInputChange = this.handleLastLowerAlignerInputChange.bind(this);
        this.handleWearIntervalInputChange = this.handleWearIntervalInputChange.bind(this);
        this.handleWearIntervalInputChange = this.handleWearIntervalInputChange.bind(this);
        this.onLinkClick = this.onLinkClick.bind(this);
    }

    public render() {
        return (
            <div>
                <Form horizontal>
                <FormGroup  style={{marginBottom: 0, marginTop: 10}}>
                    <Col componentClass={ControlLabel} sm={2}>Next visit interval:</Col>
                    <Col sm={2}>
                        <InputGroup>
                            <InputGroup.Addon><FontAwesome name='calendar' /></InputGroup.Addon>
                            <FormControl type="number" style={{width: 50}}
                                value = { this.props.visitInterval }
                                onChange = { e => this.handleWearIntervalInputChange(e) } />
                        </InputGroup>
                    </Col>
                    <Col sm={1}><FormGroup><Radio>Days</Radio><Radio>Weeks</Radio></FormGroup></Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={1} style={{marginTop: 24}}>
                        <ControlLabel>Upper:</ControlLabel>
                        <ControlLabel>Lower:</ControlLabel>
                    </Col>
                    <Col sm={1}>
                        <ControlLabel>First</ControlLabel>
                        <FormControl type="number" style={{width: 50}}
                            value = { this.props.firstUpperAligner }
                            onChange = { e => this.handleFirstUpperAlignerInputChange(e) } />
                        <FormControl type="number" style={{width: 50}}
                            value = { this.props.firstLowerAligner }
                            onChange = { e => this.handleFirstLowerAlignerInputChange(e) } />
                    </Col>
                    <Col sm={1} >
                        <ControlLabel>Last</ControlLabel>
                        <FormControl type="number" style={{width: 50}}
                            value = { this.props.lastUpperAligner }
                            onChange = { e => this.handleLastUpperAlignerInputChange(e) } />
                        <FormControl type="number" style={{width: 50}}
                            value = { this.props.lastLowerAligner }
                            onChange = { e => this.handleLastLowerAlignerInputChange(e) } />
                    </Col>
                    <Col sm={1} style={{marginTop: 32}}>
                        <div className="topLinkLine" />
                        <button onClick={ e => this.onLinkClick(e) } style={{ border:0 }} className='linkingButton hidden'>
                            <FontAwesome name="link" size="2x" />
                        </button>
                        <button onClick={ e => this.onLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <FontAwesome name="chain-broken" size="2x" />
                        </button>
                        <div className="bottomLinkLine" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Wear interval: 
                        <button onClick={ e => this.onLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <FontAwesome name='lock' size="2x" />
                        </button>
                    </Col>
                    <Col sm={1}>
                        <FormControl type="number" style={{width: 50}}
                            value = { this.props.wearInterval }
                            onChange = { e => this.handleWearIntervalInputChange(e) } />
                    </Col>
                    <Col sm={1}><FormGroup><Radio>Days</Radio><Radio>Weeks</Radio></FormGroup></Col>
                </FormGroup>
                </Form>
            </div>
        );
    }

    public onLinkClick(event: any) : void {
        event.preventDefault();
    }

    public onVisitIntervalInputChange(event: any) : void {
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
