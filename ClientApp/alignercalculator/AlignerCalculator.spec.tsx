import { shallow } from 'enzyme';
import {expect, assert} from 'chai';
import "mocha";
import * as React from 'react';

import AlignerVisitInterval from './AlignerVisitInterval';
import AlignerCalculator from './AlignerCalculatorContainer'
import AlignerWearInterval from './AlignerWearInterval';
import AlignerNumbers from './AlignerNumbers';

describe("<AlignerVisitInterval/>", () => {
        let props = { 
                visitInterval: 10,
                onVisitIntervalInputChange: () => {}
        };

        it('should always render input', () => {
                const wrapper = shallow(<AlignerVisitInterval  {...props}/>);
                expect(wrapper.find('input')).to.have.length(1);
        });
});

describe("<AlignerCalculator/>", () => {

        it('should have visit iterval', () => {
                debugger;
                const wrapper = shallow(<AlignerCalculator />);
                expect(wrapper.find(AlignerVisitInterval)).to.have.length(1);                
        });

        it(' visit iterval should have props', () => {
                const wrapper = shallow(<AlignerCalculator />);
                const visitInterval = wrapper.find(AlignerVisitInterval);
                expect(Object.keys(visitInterval.props())).to.have.length(2);                
        });

        it(' visit iterval should have method', () => {
                const wrapper = shallow(<AlignerCalculator />);
                const visitInterval = wrapper.find(AlignerVisitInterval);
                //expect(visitInterval.props().onVisitIntervalInputChange).to.be(wrapper);                
        });

        it('should update visit iterval', () => {
                const wrapper = shallow(<AlignerCalculator />);
                const state = { visitInterval: 12 };
                wrapper.setState(state);
                const visitIntervalComponent = wrapper.find(AlignerVisitInterval);
                expect(visitIntervalComponent.props().visitInterval).to.be.equal(12);                
        });

        it('should have wear iterval', () => {
                const wrapper = shallow(<AlignerCalculator />);
                expect(wrapper.find(AlignerWearInterval)).to.have.length(1);                
        });

        it('should update wear iterval', () => {
                const wrapper = shallow(<AlignerCalculator />);
                const state = { wearInterval: 3 };
                wrapper.setState(state);
                const wearIntervalComponent = wrapper.find(AlignerWearInterval);
                expect(wearIntervalComponent.props().wearInterval).to.be.equal(3);                
        });

        it('should have aligner numbers', () => {
                const wrapper = shallow(<AlignerCalculator />);
                expect(wrapper.find(AlignerNumbers)).to.have.length(1);                
        });
});
