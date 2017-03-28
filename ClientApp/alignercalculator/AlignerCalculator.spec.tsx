import { mount, shallow } from 'enzyme';
import { expect, assert } from 'chai';
import "mocha";
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { spy } from 'sinon';

import AlignerVisitInterval from './AlignerVisitInterval';
import AlignerCalculator from './AlignerCalculatorContainer'
import AlignerWearInterval from './AlignerWearInterval';
import AlignerNumbers from './AlignerNumbers';
import * as actions from './AlignerCalculatorAction';

const middlewares = [thunk];

describe("<AlignerNumbers/>", () => {
        let props = {
                visitAligner: {
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
                onWearIntervalInputChange: () => { },
                onFirstUpperAlignerInputChange: () => { },
                onLastUpperAlignerInputChange: () => { },
                onFirstLowerAlignerInputChange: () => { },
                onLastLowerAlignerInputChange: () => { },
                onVisitIntervalInputChange: () => { },
                onAlignerLinkClick: () => { },
                onVisitIntervalLinkClick: () => { },
                onWearIntervalLockClick: () => { }
        };

        it('should always render input', () => {
                //const wrapper = shallow(<AlignerNumbers  {...props}/>);
                //expect(wrapper.find('input')).to.have.length(6);
        });
});

describe("<AlignerCalculator/>", () => {
        let Component;
        let wrapper;
        let aligners;
        let visitAligner = {
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
        };

        beforeEach(() => {
                const store = configureMockStore()({ visitAligner: visitAligner });

                wrapper = mount(
                        <Provider store={store} >
                                <AlignerCalculator />
                        </Provider>
                );

                Component = wrapper.find(AlignerCalculator);
                aligners = Component.find(AlignerNumbers);
        });

        it('should have aligner numbers', () => {
                expect(Component.find(AlignerNumbers)).to.have.length(1);
        });

        it(' visit interval should have props', () => {
                expect(Object.keys(aligners.props())).to.have.length(21);
        });

        it(' visit interval should update onchange', () => {
                aligners = Component.find(AlignerNumbers);
                var callback = spy(actions.actionCreators.updateAligners);
        debugger;

                aligners.find('input#visitInterval').simulate('change', 10);
                
                //expect(callback.called).to.be.true;
        });
});
