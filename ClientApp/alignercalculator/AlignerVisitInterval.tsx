import * as React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Row, Radio, InputGroup} from "react-bootstrap";
import FontAwesome = require("react-fontawesome");
import { VisitAligner } from './alignerVisitModel';
import {debounce} from 'throttle-debounce';

export interface IAlignerVisitIntervalProps {
    visitAligner: VisitAligner;
    visitIntervalValidationState: string;
    visitIntervalLinkedStyle: string;
    isVisitIntervalAlignersLinked: boolean;
    onVisitIntervalInputChange: (event: any) => void;
    onVisitIntervalLinkClick: () => void;
}

export default class AlignerVisitInterval extends React.Component<IAlignerVisitIntervalProps, any> {
    constructor(props : IAlignerVisitIntervalProps) {
        super(props);
        
        this.handleVisitIntervalInputChange = this.handleVisitIntervalInputChange.bind(this);
        this.handleVisitIntervalLinkClick = this.handleVisitIntervalLinkClick.bind(this);
        this.handleCalendarButtonClick = this.handleCalendarButtonClick.bind(this);
    }

    public render() {
        return (
        <div>
            <tr>
                <td colSpan={2}>
                    <ControlLabel>Next visit:</ControlLabel>
                </td>
                <td colSpan={2}>
                    <FormGroup validationState={this.props.visitIntervalValidationState}>
                        <InputGroup>
                            <InputGroup.Addon>
                                <button id='calendarButton' onClick={ e => this.handleCalendarButtonClick(e) } style={{ border:0 }} className='linkingButton'>
                                    <FontAwesome name='calendar' />
                                </button>
                            </InputGroup.Addon>
                            <FormControl id="visitInterval" type="text" style={{width: 50}}
                                value = { this.props.visitAligner.visitInterval }
                                onChange = { e => this.handleVisitIntervalInputChange(e) } 
                                maxLength='3' />
                        </InputGroup>
                    </FormGroup>
                </td>
                <td>
                    <div className="floatingButton" style={{ marginBottom : -40, height : 20 }}>
                        <div className="topLinkLine" />
                        <button id='visitIntervalLink' onClick={ e => this.handleVisitIntervalLinkClick(e) } style={{ border:0 }} className='linkingButton'>
                            <span className={this.props.visitIntervalLinkedStyle} />
                        </button>
                        <div className="bottomLinkLine" />
                    </div>
                </td>
            </tr>
        </div>
    );
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