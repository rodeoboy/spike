import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import { expect, assert } from 'chai';
import "mocha";
import * as React from 'react';
import { spy } from 'sinon';

import AlignerNumbers from './AlignerNumbers';
import VisitAlignerBuilder from './VisitAlignerBuilder';

describe("<AlignerNumbers/>", () => {
    let props, spies, wrapper, dispatchSpy;
    
    beforeEach(() => {
        dispatchSpy = () => {};
        spies = {};
        spies = {
            onFirstUpperAlignerInputChange: (spies.onFirstUpperAlignerInputChange = spy()),
            onLastUpperAlignerInputChange: (spies.onLastUpperAlignerInputChange = spy()),
            onFirstLowerAlignerInputChange: (spies.onFirstLowerAlignerInputChange = spy()),
            onLastLowerAlignerInputChange: (spies.onLastLowerAlignerInputChange = spy()),
            onAlignerLinkClick: (spies.onAlignerLinkClick = spy())        
        };
        props = {visitAligner: new VisitAlignerBuilder().Build(),

        ...bindActionCreators(spies, dispatchSpy = spy())
        }
        
        wrapper = mount(<AlignerNumbers  {...props} />);
    });

    it('Should have props', () => {
        expect(Object.keys(wrapper.props())).to.have.length(6);
    });

    it('Should always render buttons', () => {
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('Should always render input', () => {
        expect(wrapper.find('input')).to.have.length(4);
    });   
        
    it('Should call onFirstUpperAlignerInputChange on change', () => {
        expect(spies.onFirstUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstUpperAligner').simulate('change',  { target: { value: 10 }});
        expect(spies.onFirstUpperAlignerInputChange.calledWith(10)).to.be.true;
    }); 
        
    it('Should call onFirstLowerAlignerInputChange on change', () => {
        expect(spies.onFirstLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstLowerAligner').simulate('change',  { target: { value: 10 }});
        expect(spies.onFirstLowerAlignerInputChange.calledWith(10)).to.be.true;
    }); 
        
    it('Should call onLastUpperAlignerInputChange on change', () => {
        expect(spies.onLastUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastUpperAligner').simulate('change', { target: { value: 10 }});
        expect(spies.onLastUpperAlignerInputChange.calledWith(10)).to.be.true;
    }); 
        
    it('Should call onLastLowerAlignerInputChange on change', () => {
        expect(spies.onLastLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastLowerAligner').simulate('change',  { target: { value: 10 }});
        expect(spies.onLastLowerAlignerInputChange.calledWith(10)).to.be.true;
    }); 
        
    it('Should not call onLastLowerAlignerInputChange on change not numeric', () => {
        expect(spies.onLastLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastLowerAligner').simulate('change',  { target: { value: 'l' }});
        expect(spies.onLastLowerAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should not call onLastUpperAlignerInputChange on change not numeric', () => {
        expect(spies.onLastUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastUpperAligner').simulate('change',  { target: { value: 'l' }});
        expect(spies.onLastUpperAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should not call onFirstLowerAlignerInputChange on change not numeric', () => {
        expect(spies.onFirstLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstLowerAligner').simulate('change',  { target: { value: 'l' }});
        expect(spies.onFirstLowerAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should not call onFirstUpperAlignerInputChange on change not numeric', () => {
        expect(spies.onFirstUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstUpperAligner').simulate('change',  { target: { value: 'l' }});
        expect(spies.onFirstUpperAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should not call onLastLowerAlignerInputChange on change not positive', () => {
        expect(spies.onLastLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastLowerAligner').simulate('change',  { target: { value: '-' }});
        expect(spies.onLastLowerAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should not call onLastUpperAlignerInputChange on change not positive', () => {
        expect(spies.onLastUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastUpperAligner').simulate('change',  { target: { value: '-' }});
        expect(spies.onLastUpperAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should not call onFirstLowerAlignerInputChange on change not positive', () => {
        expect(spies.onFirstLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstLowerAligner').simulate('change',  { target: { value: '-' }});
        expect(spies.onFirstLowerAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should not call onFirstUpperAlignerInputChange on change not positive', () => {
        expect(spies.onFirstUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstUpperAligner').simulate('change',  { target: { value: '-' }});
        expect(spies.onFirstUpperAlignerInputChange.called).to.be.false;
    }); 
        
    it('Should call onAlignerLinkClick on aligner link click', () => {
        expect(spies.onAlignerLinkClick.called).to.be.false;
        wrapper.find('button#alignerLink').simulate('click');
        expect(spies.onAlignerLinkClick.called).to.be.true;
    }); 
});     