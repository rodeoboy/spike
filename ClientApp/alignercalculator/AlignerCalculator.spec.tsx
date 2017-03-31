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

describe("<AlignerCalculator/>", () => {
        let Component, wrapper, props, spies;
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

                spies = {};
                wrapper = mount(
                        <Provider store={store} >
                                <AlignerCalculator />
                        </Provider>
                );

                Component = wrapper.find(AlignerCalculator);
        });

        it('Should have <AlignerNumbers/>', () => {
                expect(Component.find(AlignerNumbers)).to.have.length(1);
        });

        /* it('Should update aligner numbers onchange', () => {
                aligners = Component.find(AlignerNumbers);
                var callback = spy(Component.node.dispatchProps, 'updateAligners');

                aligners.find('input#visitInterval').simulate('change', { value: 10} );
                
                expect(callback.called).to.be.true;
        }); */

    describe('Wear interval lock button ', () => {
        let button;

        beforeEach(() => {
            button = wrapper.find('button#wearIntervalLock');
        });

        it('Should show lock icon on wear interval lock button by default', () => {
            expect(button.find('span').hasClass('fa-lock')).to.be.true;
        });

        it('Should change to unlock icon on wear interval lock click', () => {            
            button.simulate('click');
            expect(button.find('span').hasClass('fa-unlock')).to.be.true;
        });
    });
    
    describe('Visit interval link button ', () => {
        let button;

        beforeEach(() => {
            button = wrapper.find('button#visitIntervalLink');
        });

        it('Should show lock icon on visit interval link button by default', () => {
            expect(button.find('span').hasClass('fa-link')).to.be.true;
        });

        it('Should change to unlock icon on visit interval to unlink', () => {            
            button.simulate('click');
            expect(button.find('span').hasClass('fa-chain-broken')).to.be.true;
        });
    });
    
    describe('Aligner link button ', () => {
        let button;

        beforeEach(() => {
            button = wrapper.find('button#alignerLink');
        });

        it('Should show lock icon on aligner link button by default', () => {
            expect(button.find('span').hasClass('fa-link')).to.be.true;
        });

        it('Should change to unlock icon on aligner link click', () => {            
            button.simulate('click');
            expect(button.find('span').hasClass('fa-chain-broken')).to.be.true;
        });
    });

    it('Should call onVisitIntervalInputChange on visit interval change with blank value', () => {
        Component.handleVisitIntervalInput('');
        expect(Component.props().ErrorMessages).to.have.length(1);
    }); 
    
    it('Should call onVisitIntervalInputChange on visit interval change with negative value', () => {
        wrapper.find('input#visitInterval').simulate('change', { value: -10 });
        //expect(Component.props().ErrorMessages).to.have.length(1);
    }); 

    it('Should call onVisitIntervalInputChange on visit interval change with letter', () => {
        wrapper.find('input#visitInterval').simulate('change', { value: 'l' });
    }); 
});
