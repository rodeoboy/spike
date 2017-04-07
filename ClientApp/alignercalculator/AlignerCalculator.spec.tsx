import { mount, shallow } from 'enzyme';
import { expect, assert } from 'chai';
import "mocha";
import * as React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { spy, stub } from 'sinon';

import AlignerVisitInterval from './AlignerVisitInterval';
import AlignerCalculator from './AlignerCalculatorContainer'
import AlignerWearInterval from './AlignerWearInterval';
import AlignerNumbers from './AlignerNumbers';
import ErrorPanel from '../shared/ErrorPanel';
import { MidTreatmentModal } from './MidTreatmentModal';
import * as ActionCreators from './AlignerCalculatorAction';
import VisitAlignerBuilder from './VisitAlignerBuilder';

const middlewares = [thunk];

describe("<AlignerCalculator/> First Visit in Days", () => {
    let Component, wrapper, props, spies, dispatchSpy, visitAligner;

    beforeEach(() => {
        dispatchSpy = () => {};
        spies = {};
        spies = {
            updateAligners: (spies.updateAligners = spy()),
            updateUpperAligners: (spies.updateUpperAligners = spy()),
            updateVisitInterval: (spies.updateVisitInterval = spy()),
            onLastLowerAlignerInputChange: (spies.onLastLowerAlignerInputChange = spy()),
            updateWearIntervalUnit: (spies.updateWearIntervalUnit = spy()),
            updateLowerAligners: (spies.updateLowerAligners = spy()),
            updateVisitIntervalUnit: (spies.updateVisitIntervalUnit = spy()),
            updateWearInterval: (spies.updateWearInterval = spy())        
        };
        visitAligner = new VisitAlignerBuilder().Build();
    
        const store = configureMockStore(middlewares)({ visitAligner: visitAligner });
        props = { visitAligner: visitAligner,
            updateAligners: (spies.updateAligners = spy()),
            updateUpperAligners: (spies.updateUpperAligners = spy()),
            updateVisitInterval: (spies.updateVisitInterval = spy()),
            onLastLowerAlignerInputChange: (spies.onLastLowerAlignerInputChange = spy()),
            updateWearIntervalUnit: (spies.updateWearIntervalUnit = stub()),
            updateLowerAligners: (spies.updateLowerAligners = spy()),
            updateVisitIntervalUnit: (spies.updateVisitIntervalUnit = spy()),
            updateWearInterval: (spies.updateWearInterval = spy())   
        }
        
        wrapper = mount(
            <Provider store={store} >
                <AlignerCalculator {...props} />
            </Provider>
        );

        Component = wrapper.find(AlignerCalculator);
    });

    it('Should have <AlignerNumbers/>', () => {
        expect(Component.find(AlignerNumbers)).to.have.length(1);
    });

    describe('Wear interval lock button ', () => {
        let lock, link;

        beforeEach(() => {
            lock = wrapper.find('button#wearIntervalLock');
            link = wrapper.find('button#visitIntervalLink');
        });

        it('Should change to unlock icon on wear interval lock click', () => {
            expect(lock.find('span').hasClass('fa-lock')).to.be.true;
            lock.simulate('click');
            expect(lock.find('span').hasClass('fa-unlock')).to.be.true;
        });

        it('Should link visit interval and aligners when locked', () => {
            link.simulate('click');
            expect(link.find('span').hasClass('fa-chain-broken')).to.be.true;
            lock.simulate('click');
            expect(link.find('span').hasClass('fa-link')).to.be.true;
        });
    });

    describe('Visit interval link button ', () => {
        let link, lock;

        beforeEach(() => {
            link = wrapper.find('button#visitIntervalLink');
            lock =  wrapper.find('button#wearIntervalLock');
        });

        it('Should change to unlock icon on visit interval to unlink', () => {
            expect(link.find('span').hasClass('fa-link')).to.be.true;
            link.simulate('click');
            expect(link.find('span').hasClass('fa-chain-broken')).to.be.true;
        });

        it('Should unlock wear interval when unlinked', () => {
            expect(lock.find('span').hasClass('fa-lock')).to.be.true;
            link.simulate('click');
            expect(lock.find('span').hasClass('fa-unlock')).to.be.true;
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
        let errorPanel, component;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#visitInterval');
        });

        it('Should have validation error on change with blank value', () => {
            component.simulate('change', { target: { value: '' } });
      
            expect(errorPanel.find('li').text()).to.equal('Visit interval must be a number');
        });

        it('Should have validation error on change with value less than wear interval', () => {
            component.simulate('change', { target: { value: visitAligner.wearInterval - 1 } });
     
            expect(errorPanel.find('li').text()).to.equal('Visit interval can not be less than wear interval');
        });

        it('Should have validation error on change with value greater than 999', () => {
            component.simulate('change', { target: { value: 1000 } });
         
            expect(errorPanel.find('li').text()).to.equal('Visit interval must be less than 1000');
        });
    });

    describe('Wear interval change ', () => {
        let component, errorPanel;

        beforeEach(() => {
            component = wrapper.find('input#wearInterval');
            errorPanel = wrapper.find(ErrorPanel);
        });

        it('Should have validation error on change with blank value', () => {
            component.simulate('change', { target: { value: '' } });
           
            expect(errorPanel.find('li').text()).to.equal('Wear interval must be a number');
        });

        it('Should have validation error on  change with value greater than visit interval', () => {
            component.simulate('change', { target: { value: visitAligner.visitInterval + 1 } });

            expect(errorPanel.find('li').text()).to.equal('Wear interval can not be greater than visit interval');
        });

        it('Should have validation error on change value less than 1', () => {
            component.simulate('change', { target: { value: 0 } });

            expect(errorPanel.find('li').text()).to.equal('Wear interval must be greater than or equal to 1');
        });
    });

    describe('First upper alinger change ', () => {
        let errorPanel, component, modal;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#firstUpperAligner');
            modal = wrapper.find(MidTreatmentModal);
        });

        it('Should have validation error on change with value greater than plan end', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: visitAligner.planUpperEnd + 1 } });
            
            expect(errorPanel.find('li').text()).to.equal('First upper aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            component.simulate('change', { target: { value: visitAligner.planUpperStart - 1 } });
            
            expect(errorPanel.find('li').text()).to.equal('First upper aligner can not be less than the plan start or last alinger given');
        });

        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            component.simulate('change', { target: { value: 0 } });
            
            expect(errorPanel.find('li').text()).to.equal('First upper aligner can not be less than the plan start or last alinger given');
        });

        it('Should prompt for mid-treatment patient', () => {
            expect(modal.props().showModal).to.be.false;

            component.simulate('change', { target: { value: visitAligner.planUpperStart + 1 } });            

            expect(modal.props().showModal).to.be.true;
        });
    });

    describe('First lower alinger change ', () => {
        let errorPanel, component, modal;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#firstLowerAligner');
            modal = wrapper.find(MidTreatmentModal);
        });

        it('Should have validation error on change with value greater than plan end', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: visitAligner.planLowerEnd + 1 } });

            expect(errorPanel.find('li').text()).to.equal('First lower aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: visitAligner.planLowerStart - 1 } });

            expect(errorPanel.find('li').text()).to.equal('First lower aligner can not be less than the plan start or last alinger given');
        });

        // should be created seperately
        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: 0 } });

            expect(errorPanel.find('li').text()).to.equal('First lower aligner can not be less than the plan start or last alinger given');
        });

        it('Should prompt for mid-treatment patient', () => {
            expect(modal.props().showModal).to.be.false;

            component.simulate('change', { target: { value: visitAligner.planLowerStart + 1 } });            

            expect(modal.props().showModal).to.be.true;
        });
    });

    describe('Last upper alinger change ', () => {
        let errorPanel, component;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#lastUpperAligner');
        });

        it('Should have validation error on change with value greater than plan end', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: visitAligner.planUpperEnd + 1 } });
            
            expect(errorPanel.find('li').text()).to.equal('Last upper aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            component.simulate('change', { target: { value: visitAligner.planUpperStart - 1 } });
            
            expect(errorPanel.find('li').text()).to.equal('Last upper aligner can not be less than the plan start or last alinger given');
        });

        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            component.simulate('change', { target: { value: 0 } });
            
            expect(errorPanel.find('li').text()).to.equal('Last upper aligner can not be less than the plan start or last alinger given');
        });
    });

    describe('Last lower alinger change ', () => {
        let errorPanel, component;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#lastLowerAligner');
        });

        it('Should have validation error on change with value greater than plan end', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: visitAligner.planLowerEnd + 1 } });

            expect(errorPanel.find('li').text()).to.equal('Last lower aligner can not be greater than the plan end');
        });

        it('Should have validation error on change with value less than plan start', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: visitAligner.planLowerStart - 1 } });

            expect(errorPanel.find('li').text()).to.equal('Last lower aligner can not be less than the plan start or last alinger given');
        });

        // should be created seperately
        it('Should have validation error on  change with value less than last aligner from previous visit', () => {
            expect(errorPanel.find('li')).to.have.length(0);

            component.simulate('change', { target: { value: 0 } });

            expect(errorPanel.find('li').text()).to.equal('Last lower aligner can not be less than the plan start or last alinger given');
        });
    });
});

describe("<AlignerCalculator/> First Visit in Weeks", () => {
    let Component, wrapper, props, spies, dispatchSpy, visitAligner;

    beforeEach(() => {
        visitAligner = new VisitAlignerBuilder()
                        .WithVisitIntervalInDays(false)
                        .WithWearIntervalInDays(false).Build();
        const store = configureMockStore()({ visitAligner: visitAligner });
        spies = {};
        const props = {
            ...bindActionCreators(spies, dispatchSpy = spy())
        };
        wrapper = mount(
            <Provider store={store} >
                <AlignerCalculator {...props} />
            </Provider>
        );

        Component = wrapper.find(AlignerCalculator);
    });   

    describe('Visit inteval change ', () => {
        let errorPanel, component;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#visitInterval');
        });

        it('Should have validation error on change with blank value', () => {
            component.simulate('change', { target: { value: '' } });
      
            expect(errorPanel.find('li').text()).to.equal('Visit interval can not be less than wear interval');
        });

        it('Should have validation error on change with value less than wear interval', () => {
            component.simulate('change', { target: { value: 1 } });

            expect(errorPanel.find('li').text()).to.equal('Visit interval can not be less than wear interval');
        });

        it('Should have validation error on change with value greater than 999', () => {
            component.simulate('change', { target: { value: 1000 } });
         
            expect(errorPanel.find('li').text()).to.equal('Visit interval must be less than 1000');
        });
    });

    describe('Wear interval change ', () => {
        let component, errorPanel;

        beforeEach(() => {
            component = wrapper.find('input#wearInterval');
            errorPanel = wrapper.find(ErrorPanel);
        });

        it('Should have validation error on  change with value greater than visit interval', () => {
            component.simulate('change', { target: { value: visitAligner.visitInterval + 1 } });

            expect(errorPanel.find('li').text()).to.equal('Wear interval can not be greater than visit interval');
        });

        it('Should have validation error on change value less than 1', () => {
            component.simulate('change', { target: { value: 0 } });

            expect(errorPanel.find('li').text()).to.equal('Wear interval must be greater than or equal to 1');
        });
    });
});

describe("<AlignerCalculator/> Next Visit", () => {
    let Component, wrapper, props, spies, dispatchSpy, visitAligner;

    beforeEach(() => {
        dispatchSpy = () => {};
        spies = {};
        spies = {
            updateAligners: (spies.updateAligners = spy()),
            updateUpperAligners: (spies.updateUpperAligners = spy()),
            updateVisitInterval: (spies.updateVisitInterval = spy()),
            onLastLowerAlignerInputChange: (spies.onLastLowerAlignerInputChange = spy()),
            updateWearIntervalUnit: (spies.updateWearIntervalUnit = spy()),
            updateLowerAligners: (spies.updateLowerAligners = spy()),
            updateVisitIntervalUnit: (spies.updateVisitIntervalUnit = spy()),
            updateWearInterval: (spies.updateWearInterval = spy())        
        };
        visitAligner = new VisitAlignerBuilder().WithPreviousLower(4).WithUpperAligners(5, 8)
                                                .WithPreviousUpper(4).WithLowerAligners(5, 8).Build();
    
        const store = configureMockStore(middlewares)({ visitAligner: visitAligner });
        props = { visitAligner: visitAligner  
        }
        
        wrapper = mount(
            <Provider store={store} >
                <AlignerCalculator {...props} />
            </Provider>
        );

        Component = wrapper.find(AlignerCalculator);
    });

    describe('First upper alinger change ', () => {
        let errorPanel, component, modal;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#firstUpperAligner');
            modal = wrapper.find(MidTreatmentModal);
        });

        it('Should have validation error on change with aligners out of order', () => {
            component.simulate('change', { target: { value: visitAligner.firstUpperAligner + 1 } });
            
            expect(errorPanel.find('li').text()).to.equal('Can not apply aligners out of order');
        });

        it('Should not prompt for mid-treatment patient', () => {
            expect(modal.props().showModal).to.be.false;

            component.simulate('change', { target: { value: visitAligner.planUpperStart + 1 } });            

            expect(modal.props().showModal).to.be.false;
        });
    });

    describe('First lower alinger change ', () => {
        let errorPanel, component, modal;

        beforeEach(() => {
            errorPanel = wrapper.find(ErrorPanel);
            component = wrapper.find('input#firstLowerAligner');
            modal = wrapper.find(MidTreatmentModal);
        });

        it('Should have validation error on change with aligners out of order', () => {
            component.simulate('change', { target: { value: visitAligner.firstLowerAligner + 1 } });
            
            expect(errorPanel.find('li').text()).to.equal('Can not apply aligners out of order');
        });

        it('Should not prompt for mid-treatment patient', () => {
            expect(modal.props().showModal).to.be.false;

            component.simulate('change', { target: { value: visitAligner.planLowerStart + 1 } });            

            expect(modal.props().showModal).to.be.false;
        });
    });
});