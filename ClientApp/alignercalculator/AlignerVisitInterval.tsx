import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import {debounce} from 'throttle-debounce';
import * as Calendar from 'rc-calendar';
import * as DatePicker from 'rc-calendar/lib/Picker';

import enUS from 'rc-calendar/lib/locale/en_US';

import * as moment from 'moment';

const now = moment();
const format = 'YYYY-MM-DD';

export interface AlignerVisitIntervalProps {
    visitAligner: VisitAligner;
    visitIntervalValidationState: string;
    visitIntervalLinkedStyle: string;
    isVisitIntervalAlignersLinked: boolean;
    onVisitIntervalInputChange: (event: any) => void;
    onVisitDateChange: (value: Date) => void;
    onVisitIntervalLinkClick: () => void;
}

export default class AlignerVisitInterval extends React.Component<AlignerVisitIntervalProps, any> {
    constructor(props : AlignerVisitIntervalProps) {
        super(props);
        
        this.handleVisitIntervalInputChange = this.handleVisitIntervalInputChange.bind(this);
        this.handleVisitIntervalLinkClick = this.handleVisitIntervalLinkClick.bind(this);
        this.handleCalendarButtonClick = this.handleCalendarButtonClick.bind(this);
    }

    getInitialState() {
            const defaultCalendarValue = now.clone();
            defaultCalendarValue.add(this.props.visitAligner.visitInterval, 'month');
        return {
        showTime: false,
        showDateInput: false,
        disabled: false,
        value: defaultCalendarValue,
        };
    }

    public render() {
        const defaultCalendarValue = now.clone();
        defaultCalendarValue.add(this.props.visitAligner.visitInterval + 1, 'day');

        const calendar = (<Calendar
            locale={enUS}
            style={{ zIndex: 1000 }}
            defaultValue={defaultCalendarValue}
            showDateInput={false}
        />);

        return (
        <div className="row">
            <Col componentClass={ControlLabel} xs={4}>Next visit:</Col>
            <Col  xs={6}>
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
                            value = { this.props.visitAligner.visitInterval }
                            onChange = { e => this.handleVisitIntervalInputChange(e) } 
                            maxLength='3' />
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col xs={2}>
                <div  style={{ marginBottom : -40, height : 20 }}>
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

    public handleVisitIntervalInputChange(event: any) : void {
        event.persist();        
        handleNumber(event.target.value, this.props.onVisitIntervalInputChange);
    }

    public handleCalendarButtonClick(event: any) : void {
        let isOpen = !this.state.calendarOpen;
        this.setState({calendarOpen : isOpen});
    }
    
};

function handleNumber(value, func) {
    // Only allow numbers
    if (!isNaN(value) && parseInt(value) >= 0)
        debounce(500, func(parseInt(value)));
    // Except for blanks to allow deleting a value
    if (value == '')
        debounce(500, func(value));
}