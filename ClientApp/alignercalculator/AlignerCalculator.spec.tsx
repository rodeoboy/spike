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
import ErrorPanel from './ErrorPanel';
import * as actions from './AlignerCalculatorAction';
import VisitAlignerBuilder from './VisitAlignerBuilder';

const middlewares = [thunk];

describe("<AlignerCalculator/>", () => {
    let Component, wrapper, props, spies;
    let visitAligner = new VisitAlignerBuilder().Build();

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

    describe('Visit inteval change ', () => {
        it('Should have validation error on change with blank value', () => {
            wrapper.find('input#visitInterval').simulate('change', { target: { value: '' } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Visit interval must be a number');
        });

        it('Should have validation error on change with value less than wear interval', () => {
            wrapper.find('input#visitInterval').simulate('change', { target: { value: visitAligner.wearInterval - 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Visit interval can not be less than wear interval');
        });

        it('Should have validation error on change with value greater than 999', () => {
            wrapper.find('input#visitInterval').simulate('change', { target: { value: 1000 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Visit interval must be less than 1000');
        });
    });

    describe('Wear inteval change ', () => {
        it('Should have validation error on change with blank value', () => {
            wrapper.find('input#wearInterval').simulate('change', { target: { value: '' } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Wear interval must be a number');
        });

        it('Should have validation error on  change with value greater than visit interval', () => {
            wrapper.find('input#wearInterval').simulate('change', { target: { value: visitAligner.visitInterval + 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Wear interval can not be greater than visit interval');
        });

        it('Should have validation error on change value less than 1', () => {
            wrapper.find('input#wearInterval').simulate('change', { target: { value: 0 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Wear interval must be greater than or equal to 1');
        });
    });

    describe('First upper alinger change ', () => {
        it('Should have validation error on change with value greater than plan end', () => {
            wrapper.find('input#firstUpperAligner').simulate('change', { target: { value: visitAligner.planUpperEnd + 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('First upper aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            wrapper.find('input#firstUpperAligner').simulate('change', { target: { value: visitAligner.planUpperStart - 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('First upper aligner can not be less than the plan start or last alinger given');
        });

        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            wrapper.find('input#firstUpperAligner').simulate('change', { target: { value: visitAligner.previousUpper - 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('First upper aligner can not be less than the plan start or last alinger given');
        });
    });

    describe('First lower alinger change ', () => {
        it('Should have validation error on change with value greater than plan end', () => {
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span')).to.have.length(0);
            wrapper.find('input#firstLowerAligner').simulate('change', { target: { value: visitAligner.planLowerEnd + 1 } });
            expect(errorPanel.find('span').text()).to.equal('First lower aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span')).to.have.length(0);
            wrapper.find('input#firstLowerAligner').simulate('change', { target: { value: visitAligner.planLowerStart - 1 } });
            expect(errorPanel.find('span').text()).to.equal('First lower aligner can not be less than the plan start or last alinger given');
        });

        // should be created seperately
        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span')).to.have.length(0);
            wrapper.find('input#firstLowerAligner').simulate('change', { target: { value: visitAligner.previousLower - 1 } });
            expect(errorPanel.find('span').text()).to.equal('First lower aligner can not be less than the plan start or last alinger given');
        });
    });

    describe('Last upper alinger change ', () => {
        it('Should have validation error on change with value greater than plan end', () => {
            wrapper.find('input#lastUpperAligner').simulate('change', { target: { value: visitAligner.planUpperEnd + 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Last upper aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            wrapper.find('input#lastUpperAligner').simulate('change', { target: { value: visitAligner.planUpperStart - 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Last upper aligner can not be less than the plan start or last alinger given');
        });

        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            wrapper.find('input#lastUpperAligner').simulate('change', { target: { value: visitAligner.previousUpper - 1 } });
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span').text()).to.equal('Last upper aligner can not be less than the plan start or last alinger given');
        });
    });

    describe('Last lower alinger change ', () => {
        it('Should have validation error on change with value greater than plan end', () => {
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span')).to.have.length(0);
            wrapper.find('input#lastLowerAligner').simulate('change', { target: { value: visitAligner.planLowerEnd + 1 } });
            expect(errorPanel.find('span').text()).to.equal('Last lower aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span')).to.have.length(0);
            wrapper.find('input#lastLowerAligner').simulate('change', { target: { value: visitAligner.planLowerStart - 1 } });
            expect(errorPanel.find('span').text()).to.equal('Last lower aligner can not be less than the plan start or last alinger given');
        });

        // should be created seperately
        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            var errorPanel = wrapper.find(ErrorPanel);
            expect(errorPanel.find('span')).to.have.length(0);
            wrapper.find('input#lastLowerAligner').simulate('change', { target: { value: visitAligner.previousLower - 1 } });
            expect(errorPanel.find('span').text()).to.equal('Last lower aligner can not be less than the plan start or last alinger given');
        });
    });
});
