import {expect, assert} from 'chai';
import * as reducer from './AlignerCalculatorReducer';
import * as actions from './AlignerCalculatorAction'
import { VisitAligner } from './alignerVisitModel'

export default class VisitAlignerBuilder {
    visitAligner : VisitAligner;
    constructor() {
        this.visitAligner = {
            visitInterval : 12,
            wearInterval : 2,
            firstUpperAligner : 1,
            lastUpperAligner : 4,
            firstLowerAligner : 1,
            lastLowerAligner : 4,     
            planLowerStart : 1,
            planUpperStart : 1,
            treatmentVisitInteval : 8,
            treatmentWearInterval : 2,   
            isMidTreatment : false,    
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
        this.visitAligner.lastLowerAligner = last;
        return this;
    }

    WithUpperAlignerPlanStart (first : number) {
        this.visitAligner.firstUpperAligner = first;
        return this;
    }

    WithLowerAlignerPlanStart (first : number) {
        this.visitAligner.firstLowerAligner = first;
        return this;
    }

    Build ()  {
        return this.visitAligner;
    }
}

describe ('Aligner Calculator Reducer', () => {
    const initialState = new VisitAlignerBuilder().Build();

    it('should update last aligners', () => {
        const changedState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateAligners(changedState);
        debugger;

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });

    it('should update visit interval', () => {
        const changedState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateVisitInterval(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.visitInterval).to.be.equal(8);
    });

    it('should update wear interval', () => {
        const changedState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateWearInterval(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.wearInterval).to.be.equal(3);
    });
    
    it('should update lower last aligners for staggered start', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithLowerAligners(4, 4).Build();

        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
    
    it('should update upper last aligners for staggered start', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithUpperAligners(4, 4).Build();
                                
        const action = actions.actionCreators.updateAligners(changedState);
        debugger;
        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
    
    it('should update last aligners with no lower tray', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithLowerAligners(0, 0).Build();

        const action = actions.actionCreators.updateAligners(changedState);
        debugger;

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(0);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
    
    it('should update last aligners with no upper tray', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithUpperAligners(0, 0).Build();

        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(0);
    });

    it('should be mid-treatment patient', () => {        
        const changedState = new VisitAlignerBuilder()
                                .WithUpperAligners(4, 4).Build();
        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.isMidTreatment).to.be.true;
    });
});