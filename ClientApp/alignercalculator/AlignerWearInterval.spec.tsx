import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import { expect, assert } from 'chai';
import "mocha";
import * as React from 'react';
import { spy } from 'sinon';

import AlignerWearInterval from './AlignerWearInterval';
import VisitAlignerBuilder from './VisitAlignerBuilder';

describe("<AlignerWearInterval />", () => {
    let props, spies, wrapper, dispatchSpy;
    
    beforeEach(() => {
        dispatchSpy = () => {};
        spies = {};
        spies = {
            onWearIntervalInputChange: (spies.onWearIntervalInputChange = spy()),
            onWearIntervalLockClick: (spies.onWearIntervalLockClick = spy()),
            onWearIntervalUnitChange: (spies.onWearIntervalUnitChange = spy())          
        };
        props = {visitAligner: new VisitAlignerBuilder().Build(),

        ...bindActionCreators(spies, dispatchSpy = spy())
        }
        
        wrapper = mount(<AlignerWearInterval  {...props} />);
    });

    it('Should have props', () => {
        expect(Object.keys(wrapper.props())).to.have.length(4);
    });

    it('Should always render buttons', () => {
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('Should always render input', () => {
        expect(wrapper.find('input')).to.have.length(3);
    }); 

    describe('onWearIntervalInputChange', () => {
        let input;

        beforeEach(() => {
            input = wrapper.find('input#wearInterval');
        });

        it('Should call onWearIntervalInputChange on wear interval change', () => {
            expect(spies.onWearIntervalInputChange.called).to.be.false;
            input.simulate('change',  { target: { value: 10 }});

            expect(spies.onWearIntervalInputChange.calledWith(10)).to.be.true;
        }); 
            
        it('Should not call onWearIntervalInputChange on change not numeric', () => {
            expect(spies.onWearIntervalInputChange.called).to.be.false;
            input.simulate('change',  { target: { value: 'l' }});

            expect(spies.onWearIntervalInputChange.called).to.be.false;
        }); 
            
        it('Should not call onWearIntervalInputChange on change not positive', () => {
            expect(spies.onWearIntervalInputChange.called).to.be.false;
            input.simulate('change',  { target: { value: '-' }});

            expect(spies.onWearIntervalInputChange.called).to.be.false;
        }); 
    });

    describe('onWearIntervalInputChange', () => {
        let input;

        beforeEach(() => {
            props = {visitAligner: new VisitAlignerBuilder()
                                    .WithWearIntervalInDays(false).Build(),

            ...bindActionCreators(spies, dispatchSpy = spy())
            }
            
            wrapper = mount(<AlignerWearInterval  {...props} />);

            input = wrapper.find('input#wearInterval');
        });

        it('Should call with value in days', () => {
            expect(spies.onWearIntervalInputChange.called).to.be.false;
            input.simulate('change',  { target: { value: 2 }});

            expect(spies.onWearIntervalInputChange.calledWith(14)).to.be.true;
        }); 
    });

    describe('onWearIntervalLockClick', () => {
        let button;

        beforeEach(() => {
            button = wrapper.find('button#wearIntervalLock');
        });

        it('Should call onWearIntervalLockClick on wear interval lock click', () => {
            expect(spies.onWearIntervalLockClick.called).to.be.false;
            button.simulate('click');
            expect(spies.onWearIntervalLockClick.called).to.be.true;
        });
    });

    describe('onWearIntervalUnitChange', () => {
        let days, weeks;

        beforeEach(() => {
            days = wrapper.find('input#WearIntervalDays');
            weeks = wrapper.find('input#WearIntervalWeeks');
        });

        it('Should be called with false', () => {
            expect(spies.onWearIntervalUnitChange.calledWith(false)).to.be.false;

            weeks.simulate('change');

            expect(spies.onWearIntervalUnitChange.calledWith(false)).to.be.true;
        });

        it('Should be called with true', () => {
            expect(spies.onWearIntervalUnitChange.calledWith(true)).to.be.false;

            days.simulate('change');

            expect(spies.onWearIntervalUnitChange.calledWith(true)).to.be.true;
        });
    });
});