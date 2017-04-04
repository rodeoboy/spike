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
            onWearIntervalLockClick: (spies.onWearIntervalLockClick = spy())             
        };
        props = {visitAligner: new VisitAlignerBuilder().Build(),

        ...bindActionCreators(spies, dispatchSpy = spy())
        }
        
        wrapper = mount(<AlignerWearInterval  {...props} />);
    });

    it('Should always render buttons', () => {
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('Should always render input', () => {
        expect(wrapper.find('input')).to.have.length(1);
    });

});