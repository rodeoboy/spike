import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import { expect, assert } from 'chai';
import "mocha";
import * as React from 'react';
import { spy } from 'sinon';

import AlignerVisitInterval from './AlignerVisitInterval';
import VisitAlignerBuilder from './VisitAlignerBuilder';

describe("<AlignerVisitInterval />", () => {
    let props, spies, wrapper, dispatchSpy;
    
    beforeEach(() => {
        dispatchSpy = () => {};
        spies = {};
        spies = {
            onVisitIntervalInputChange: (spies.onVisitIntervalInputChange = spy()),
            onVisitIntervalLinkClick: (spies.onVisitIntervalLinkClick = spy()), 
            onVisitDateChange: (spies.onVisitDateChange = spy()), 
            onVisitIntervalUnitChange: (spies.onVisitIntervalUnitChange = spy()),     
        };
        props = {visitAligner: new VisitAlignerBuilder().Build(),

        ...bindActionCreators(spies, dispatchSpy = spy())
        }
        
        wrapper = mount(<AlignerVisitInterval  {...props} />);
    });

    it('Should have props', () => {
        expect(Object.keys(wrapper.props())).to.have.length(5);
    });

    it('Should always render buttons', () => {
        expect(wrapper.find('button')).to.have.length(2);
    });

    it('Should always render input', () => {
        expect(wrapper.find('input')).to.have.length(3);
    });
    

    describe('onVisitIntervalInputChange', () => {
        let input;

        beforeEach(() => {
            input = wrapper.find('input#visitInterval');
        });

        it('Should call onVisitIntervalInputChange on visit interval change', () => {
            expect(spies.onVisitIntervalInputChange.called).to.be.false;

            input.simulate('change',  { target: { value: 10 }});

            expect(spies.onVisitIntervalInputChange.calledWith(10)).to.be.true;
        }); 
            
        it('Should not call onVisitIntervalInputChange on change not numeric', () => {
            expect(spies.onVisitIntervalInputChange.called).to.be.false;

            input.simulate('change',  { target: { value: 'l' }});

            expect(spies.onVisitIntervalInputChange.called).to.be.false;
        }); 
            
        it('Should not call onVisitIntervalInputChange on change not positive', () => {
            expect(spies.onVisitIntervalInputChange.called).to.be.false;

            input.simulate('change',  { target: { value: '-' }});

            expect(spies.onVisitIntervalInputChange.called).to.be.false;
        }); 
            
    });

    describe('onVisitIntervalLinkClick', () => {
        let button;

        beforeEach(() => {
            button = wrapper.find('button#visitIntervalLink');
        });

        it('Should call ', () => {
            expect(spies.onVisitIntervalLinkClick.called).to.be.false;

            button.simulate('click');

            expect(spies.onVisitIntervalLinkClick.called).to.be.true;
        }); 

    });

    describe('onVisitIntervalUnitChange', () => {
        let days, weeks;

        beforeEach(() => {
            days = wrapper.find('input#visitIntervalDays');
            weeks = wrapper.find('input#visitIntervalWeeks');
        });

        it('Should be called with false', () => {
            expect(spies.onVisitIntervalUnitChange.calledWith(false)).to.be.false;

            weeks.simulate('change');

            expect(spies.onVisitIntervalUnitChange.calledWith(false)).to.be.true;
        });

        it('Should be called with true', () => {
            expect(spies.onVisitIntervalUnitChange.calledWith(true)).to.be.false;

            days.simulate('change');

            expect(spies.onVisitIntervalUnitChange.calledWith(true)).to.be.true;
        });
    });
});