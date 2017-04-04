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
    
    it('Should call onVisitIntervalInputChange on visit interval change', () => {
        expect(spies.onVisitIntervalInputChange.called).to.be.false;
        wrapper.find('input#visitInterval').simulate('change',  { target: { value: 10 }});
        expect(spies.onVisitIntervalInputChange.calledWith(10)).to.be.true;
    }); 
        
    it('Should not call onVisitIntervalInputChange on change not numeric', () => {
        expect(spies.onVisitIntervalInputChange.called).to.be.false;
        wrapper.find('input#visitInterval').simulate('change',  { target: { value: 'l' }});
        expect(spies.onVisitIntervalInputChange.called).to.be.false;
    }); 
        
    it('Should not call onVisitIntervalInputChange on change not positive', () => {
        expect(spies.onVisitIntervalInputChange.called).to.be.false;
        wrapper.find('input#visitInterval').simulate('change',  { target: { value: '-' }});
        expect(spies.onVisitIntervalInputChange.called).to.be.false;
    }); 
        
    it('Should call onVisitIntervalLinkClick on visit interval link click', () => {
        expect(spies.onVisitIntervalLinkClick.called).to.be.false;
        wrapper.find('button#visitIntervalLink').simulate('click');
        expect(spies.onVisitIntervalLinkClick.called).to.be.true;
    }); 
});