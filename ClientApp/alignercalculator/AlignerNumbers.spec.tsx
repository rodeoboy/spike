import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import { expect, assert } from 'chai';
import "mocha";
import * as React from 'react';
import { spy } from 'sinon';

import AlignerNumbers from './AlignerNumbers';

describe("<AlignerNumbers/>", () => {
    let props, spies, wrapper, dispatchSpy;
    
    beforeEach(() => {
        dispatchSpy = () => {};
        spies = {};
        spies = {
            onWearIntervalInputChange: (spies.onWearIntervalInputChange = spy()),
            onFirstUpperAlignerInputChange: (spies.onFirstUpperAlignerInputChange = spy()),
            onLastUpperAlignerInputChange: (spies.onLastUpperAlignerInputChange = spy()),
            onFirstLowerAlignerInputChange: (spies.onFirstLowerAlignerInputChange = spy()),
            onLastLowerAlignerInputChange: (spies.onLastLowerAlignerInputChange = spy()),
            onVisitIntervalInputChange: (spies.onVisitIntervalInputChange = spy()),
            onAlignerLinkClick: (spies.onAlignerLinkClick = spy()),
            onVisitIntervalLinkClick: (spies.onVisitIntervalLinkClick = spy()),
            onWearIntervalLockClick: (spies.onWearIntervalLockClick = spy())            
        };
        props = {visitAligner: {
            visitInterval: 8,
            firstUpperAligner: 1,
            lastUpperAligner: 4,
            firstLowerAligner: 1,
            lastLowerAligner: 4,
            wearInterval: 2,
            isUpperLowerLinked: true,
            isVisitIntervalAlignersLinked: true,
            isWearIntervalLocked: true,
            wearIntervalLockedStyle: "",
            visitIntervalLinkedStyle: "",
            alignerLinkedStyle: "",
        },

        ...bindActionCreators(spies, dispatchSpy = spy())
        }
        
        wrapper = mount(<AlignerNumbers  {...props} />);
    });

    it('aligner numbers should have props', () => {
        debugger;
        expect(Object.keys(wrapper.props())).to.have.length(10);
    });

    it('Should always render buttons', () => {
        expect(wrapper.find('button')).to.have.length(3);
    });

    it('Should always render input', () => {
        expect(wrapper.find('input')).to.have.length(8);
    });

    it('Should always render form', () => {
        expect(wrapper.find('form')).to.have.length(1);
    });
    
    it('Should call onVisitIntervalInputChange on visit interval change', () => {
        expect(spies.onVisitIntervalInputChange.called).to.be.false;
        wrapper.find('input#visitInterval').simulate('change', { value: 10 });
        expect(spies.onVisitIntervalInputChange.called).to.be.true;
    }); 
        
    it('Should call onWearIntervalInputChange on wear interval change', () => {
        expect(spies.onWearIntervalInputChange.called).to.be.false;
        wrapper.find('input#wearInterval').simulate('change', { value: 10 });
        expect(spies.onWearIntervalInputChange.called).to.be.true;
    }); 
        
    it('Should call onFirstUpperAlignerInputChange on change', () => {
        expect(spies.onFirstUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstUpperAligner').simulate('change', { value: 10 });
        expect(spies.onFirstUpperAlignerInputChange.called).to.be.true;
    }); 
        
    it('Should call onFirstLowerAlignerInputChange on change', () => {
        expect(spies.onFirstLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#firstLowerAligner').simulate('change', { value: 10 });
        expect(spies.onFirstLowerAlignerInputChange.called).to.be.true;
    }); 
        
    it('Should call onLastUpperAlignerInputChange on change', () => {
        expect(spies.onLastUpperAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastUpperAligner').simulate('change', { value: 10 });
        expect(spies.onLastUpperAlignerInputChange.called).to.be.true;
    }); 
        
    it('Should call onLastLowerAlignerInputChange on change', () => {
        expect(spies.onLastLowerAlignerInputChange.called).to.be.false;
        wrapper.find('input#lastLowerAligner').simulate('change', { value: 10 });
        expect(spies.onLastLowerAlignerInputChange.called).to.be.true;
    }); 
        
    it('Should call onVisitIntervalLinkClick on visit interval link click', () => {
        expect(spies.onVisitIntervalLinkClick.called).to.be.false;
        wrapper.find('button#visitIntervalLink').simulate('click');
        expect(spies.onVisitIntervalLinkClick.called).to.be.true;
    }); 
        
    it('Should call onAlignerLinkClick on aligner link click', () => {
        expect(spies.onAlignerLinkClick.called).to.be.false;
        wrapper.find('button#alignerLink').simulate('click');
        expect(spies.onAlignerLinkClick.called).to.be.true;
    }); 

    describe('Wear interval lock button ', () => {
        let button;

        beforeEach(() => {
            button = wrapper.find('button#wearIntervalLock');
        })

        it('Should call onWearIntervalLockClick on wear interval lock click', () => {
            expect(spies.onWearIntervalLockClick.called).to.be.false;
            button.simulate('click');
            expect(spies.onWearIntervalLockClick.called).to.be.true;
        });
    });
});     