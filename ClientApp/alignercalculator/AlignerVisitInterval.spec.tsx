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
            onVisitIntervalLinkClick: (spies.onVisitIntervalLinkClick = spy())          
        };
        props = {visitAligner: new VisitAlignerBuilder().Build(),

        ...bindActionCreators(spies, dispatchSpy = spy())
        }
        
        wrapper = mount(<AlignerVisitInterval  {...props} />);
    });

    it('Should always render buttons', () => {
        expect(wrapper.find('button')).to.have.length(2);
    });

    it('Should always render input', () => {
        expect(wrapper.find('input')).to.have.length(1);
    });

});