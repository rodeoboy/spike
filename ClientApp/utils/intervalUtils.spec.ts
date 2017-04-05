import { expect, assert } from 'chai';
import "mocha";
import {handleNumber, roundIntervalToWeeks, displayIntervalInWeeks} from './intervalUtils'

describe("Interval Utils", () => {
    
    it('Should round interval to weeks', () => {
        let initial = 70;
        let expected = 70;

        expect(roundIntervalToWeeks(initial)).to.equal(expected);
    });
    
    it('Should round interval up to weeks', () => {
        let initial = 68;
        let expected = 70;

        expect(roundIntervalToWeeks(initial)).to.equal(expected);
    });
    
    it('Should round interval down to weeks', () => {
        let initial = 71;
        let expected = 70;

        expect(roundIntervalToWeeks(initial)).to.equal(expected);
    });
    
    it('Should display single day interval down as blank', () => {
        let initial = 1;
        let expected = '';

        expect(displayIntervalInWeeks(initial)).to.equal(expected);
    });
    
    it('Should display zero interval as blank', () => {
        let initial = 0;
        let expected = '';

        expect(displayIntervalInWeeks(initial)).to.equal(expected);
    });
});