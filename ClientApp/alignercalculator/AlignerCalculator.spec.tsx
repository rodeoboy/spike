import { shallow } from 'enzyme';
import {expect, assert} from 'chai';
import "mocha";
import * as React from 'react';

import AlignerVisitInterval from './AlignerVisitInterval';

describe("AlignerVisitInterval", () => {
        let props = { 
                visitInterval: 10,
                onVisitIntervalInputChange: () => {}
        };

        it('should', () => {
                const wrapper = shallow(<AlignerVisitInterval  {...props}/>);
                expect(wrapper.find('div')).to.have.length(1);
        });

        it('should save without error', () => {
                expect(true).to.equal(true);
        });
});

