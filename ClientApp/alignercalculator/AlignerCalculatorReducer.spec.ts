import {expect, assert} from 'chai';
import { visitAlignerReducer } from './AlignerCalculatorReducer';
import * as actions from './AlignerCalculatorAction'
import { VisitAligner } from './alignerVisitModel'

export default class VisitAlignerBuilder {
    visitAligner : VisitAligner;
    constructor() {
        this.visitAligner = {
            visitInterval : 12,
            wearInterval : 2,
            firstUpperAligner: 1,
            lastUpperAligner: 4,
            firstLowerAligner: 1,
            lastLowerAligner: 4,            
        };
    }

    WithVisitInterval (interval : number) {
        this.visitAligner.visitInterval = interval;
        return this;
    }

    WithWearInterval (interval : number) {
        this.visitAligner.wearInterval = interval;
        return this;
    }

    WithUpperAligners (first : number, last : number) {
        this.visitAligner.firstUpperAligner = first;
        this.visitAligner.lastUpperAligner = last;
        return this;
    }

    WithLowerAligners (first : number, last : number) {
        this.visitAligner.firstLowerAligner = first;
        this.visitAligner.lastUpperAligner = last;
        return this;
    }

    Build ()  {
        return this.visitAligner;
    }
}

describe ('Aligner Calculator Reducer', () => {

    it('should update last aligners', () => {
        const initialState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateAligners(initialState);

        const newState = visitAlignerReducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });

    it('should update visit interval', () => {
        const initialState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateVisitInterval(initialState);

        const newState = visitAlignerReducer(initialState, action);

        expect(newState.visitInterval).to.be.equal(8);
    });

    it('should update wear interval', () => {
        const initialState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateWearInterval(initialState);

        const newState = visitAlignerReducer(initialState, action);

        expect(newState.wearInterval).to.be.equal(3);
    });
    
    it('should update last aligners for staggered start', () => {
        const initialState = new VisitAlignerBuilder()
                                .WithLowerAligners(4, 4).Build();
                                
        const action = actions.actionCreators.updateAligners(initialState);

        const newState = visitAlignerReducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
});