import { expect, assert } from 'chai';
import "mocha";
import { spy } from 'sinon';
import {handleNumber, roundDaysToNearestWeek, displayIntervalInWeeks} from './intervalUtils'

describe("Interval Utils", () => {
    
    describe("handleNumber", () => {
        it('Should call function with value', () => {
            let initial = 1;
            let func = spy();

            handleNumber(initial, func);
            
            expect(func.calledWith(initial)).to.be.true;
        });

        it('Should call function with 0', () => {
            let initial = 0;
            let func = spy();

            handleNumber(initial, func);
            
            expect(func.calledWith(initial)).to.be.true;
        });

        it('Should call function with blank', () => {
            let initial = '';
            let func = spy();

            handleNumber(initial, func);
            
            expect(func.calledWith(initial)).to.be.true;
        });

        it('Should not call function with letter', () => {
            let initial = 'A';
            let func = spy();

            handleNumber(initial, func);
            
            expect(func.called).to.be.false;
        });

        it('Should not call function with minus', () => {
            let initial = '-';
            let func = spy();

            handleNumber(initial, func);
            
            expect(func.called).to.be.false;
        });

        it('Should not call function with negative number', () => {
            let initial = -1;
            let func = spy();

            handleNumber(initial, func);
            
            expect(func.called).to.be.false;
        });
    });

    describe("roundDaysToNearestWeek", () => {
        it('Should round interval to weeks', () => {
            let initial = 70;
            let expected = 70;

            expect(roundDaysToNearestWeek(initial)).to.equal(expected);
        });
        
        it('Should round interval up to weeks', () => {
            let initial = 68;
            let expected = 70;

            expect(roundDaysToNearestWeek(initial)).to.equal(expected);
        });
        
        it('Should round interval down to weeks', () => {
            let initial = 71;
            let expected = 70;

            expect(roundDaysToNearestWeek(initial)).to.equal(expected);
        });
    });

    describe("displayIntervalInWeeks", () => {
        
        it('Should display zero interval as blank', () => {
            let initial = 0;
            let expected = '';

            expect(displayIntervalInWeeks(initial)).to.equal(expected);
        });
        
        it('Should display correct weeks', () => {
            let initial = 56;
            let expected = 8;

            expect(displayIntervalInWeeks(initial)).to.equal(expected);
        });
    });
});