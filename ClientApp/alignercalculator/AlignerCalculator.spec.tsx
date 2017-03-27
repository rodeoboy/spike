import { mount, shallow } from 'enzyme';
import {expect, assert} from 'chai';
import "mocha";
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AlignerVisitInterval from './AlignerVisitInterval';
import AlignerCalculator from './AlignerCalculatorContainer'
import AlignerWearInterval from './AlignerWearInterval';
import AlignerNumbers from './AlignerNumbers';

const middlewares = [thunk];
const mockStore = configureMockStore({});

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

	let Component;
        let wrapper;

	beforeEach(() => {
		const store = mockStore({});

		wrapper = mount(
			<Provider  store={store} >
				<AlignerCalculator />
			</Provider>
		);

		Component = wrapper.find(AlignerCalculator);
		//AlignerCalculator = Component.find(Choice);
	});

        it('should have visit iterval', () => {
                expect(Component.find(AlignerNumbers)).to.have.length(1);                
        });

        it(' visit iterval should have props', () => {
                const aligners = Component.find(AlignerNumbers);
                expect(Object.keys(aligners.props())).to.have.length(17);                
        });

        it(' visit iterval should have method', () => {
                const aligners = Component.find(AlignerNumbers);
                expect(aligners.props().onVisitIntervalInputChange).to.be(wrapper);                
        });

        it('should update visit iterval', () => {
                const state = { visitInterval: 12 };
                wrapper.setState(state);
                const aligners = Component.find(AlignerNumbers);
                debugger;
                expect(aligners.state.visitInterval).to.be.equal(12);                
        });

        it('should update wear iterval', () => {
                const state = { wearInterval: 3 };
                wrapper.setState(state);
                const aligners = Component.find(AlignerNumbers);
                debugger;
                expect(aligners.state.wearInterval).to.be.equal(3);                
        });
});
