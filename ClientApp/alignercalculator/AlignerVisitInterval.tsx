import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import * as Calendar from 'rc-calendar';
import * as DatePicker from 'rc-calendar/lib/Picker';
import {handleNumber, displayIntervalInWeeks} from '../utils/intervalUtils'

import enUS from 'rc-calendar/lib/locale/en_US';

import * as moment from 'moment';

const now = moment();
const format = 'YYYY-MM-DD';

export interface AlignerVisitIntervalProps {
    visitAligner: VisitAligner;
    visitIntervalValidationState: string;
    visitIntervalLinkedStyle: string;
    isVisitIntervalAlignersLinked: boolean;
    nextVisitDate: Date;
    onVisitIntervalInputChange: (event: any) => void;
    onVisitIntervalLinkClick: () => void;
    onVisitDateChange: (value: Date) => void;
    onVisitIntervalUnitChange: (isInDays: boolean) => void;
}

export default class AlignerVisitInterval extends React.Component<AlignerVisitIntervalProps, any> {
    constructor(props : AlignerVisitIntervalProps) {
        super(props);
        
        this.handleVisitIntervalInputChange = this.handleVisitIntervalInputChange.bind(this);
        this.handleVisitIntervalLinkClick = this.handleVisitIntervalLinkClick.bind(this);
        this.handleCalendarButtonClick = this.handleCalendarButtonClick.bind(this);
        this.handleVisitIntervalUnitChange = this.handleVisitIntervalUnitChange.bind(this);
    }

    public render() {
        const calendar = (<Calendar
            locale={enUS}
            style={{ zIndex: 1000 }}
            value={this.props.nextVisitDate}
            showDateInput={false}
        />);

        return (
        <div className="row">
            <Col componentClass={ControlLabel} xs={3}>Next visit:</Col>
            <Col  xs={4}>
                <FormGroup validationState={this.props.visitIntervalValidationState}>
                    <InputGroup>
                        <InputGroup.Addon>
                            <DatePicker placement='bottomLeft' calendar={calendar} onChange={ value => this.handleNextVisitDateChange(value) }>
                                {
                                    ({ value }) => {
                                        return (
                                        <button id='calendarButton' style={{ border:0 }} className='linkingButton'>
                                            <FontAwesome name='calendar' />
                                        </button>
                                        );
                                    }
                                }
                            </DatePicker>
                        </InputGroup.Addon>
                        <FormControl id="visitInterval" type="text" style={{width: 50}}
                            value = { this.props.visitAligner.visitIntervalInDays ? this.props.visitAligner.visitInterval : displayIntervalInWeeks(this.props.visitAligner.visitInterval) }
                            onChange = { e => this.handleVisitIntervalInputChange(e) } 
                            maxLength='3' />
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col xs={2} style={{ marginLeft : 5 }}>
                <Radio name="VisitIntervalUnit"  id="visitIntervalDays" style={{marginTop: 0}} 
                    checked={this.props.visitAligner.visitIntervalInDays} 
                    onChange={ e => this.handleVisitIntervalUnitChange(e)} value="Days">Days</Radio>
                <Radio name="VisitIntervalUnit" id="visitIntervalWeeks"
                    checked={!this.props.visitAligner.visitIntervalInDays} 
                    onChange={ e => this.handleVisitIntervalUnitChange(e)} value="Weeks">Weeks</Radio>
            </Col>
            <Col xs={2}>
                <div  style={{ marginTop : 25, height : 20 }}>
                    <div className="topLinkLine" />
                    <button id='visitIntervalLink' onClick={ e => this.handleVisitIntervalLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                        <span className={this.props.visitIntervalLinkedStyle} />
                    </button>
                    <div className="bottomLinkLine" />
                </div>
            </Col>
        </div>
        );
    }

    public handleNextVisitDateChange(value: Date) : void {
        event.preventDefault();
        this.props.onVisitDateChange(value);
    }

    public handleVisitIntervalLinkClick(event: any) : void {
        event.preventDefault();
        this.props.onVisitIntervalLinkClick();
    }

    public handleVisitIntervalUnitChange(event: any) : void {
        let isInDays = event.target.value == "Days";
        this.props.onVisitIntervalUnitChange(isInDays);
    }

    public handleVisitIntervalInputChange(event: any) : void {
        event.persist();        
        handleNumber(event.target.value, this.props.onVisitIntervalInputChange);
    }

    public handleCalendarButtonClick(event: any) : void {
        let isOpen = !this.state.calendarOpen;
        this.setState({calendarOpen : isOpen});
    }
    
};