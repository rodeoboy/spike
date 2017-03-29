import {expect, assert} from 'chai';
import * as reducer from './AlignerCalculatorReducer';
import * as actions from './AlignerCalculatorAction';
import { VisitAligner } from './alignerVisitModel';
import VisitAlignerBuilder from './VisitAlignerBuilder';

describe ('Aligner Calculator Reducer', () => {
    const initialState = new VisitAlignerBuilder().Build();

    it('Should update last aligners', () => {
        const changedState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
    
    it('Should update lower last aligners for staggered start', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithLowerAligners(4, 4).Build();

        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
    
    it('Should update upper last aligners for staggered start', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithUpperAligners(4, 4).Build();
                                
        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
    
    it('Should update last aligners with no lower tray', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithLowerAligners(0, 0).Build();

        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(0);
        expect(newState.lastUpperAligner).to.be.equal(6);
    });
    
    it('Should update last aligners with no upper tray', () => {
        const changedState = new VisitAlignerBuilder()
                                .WithUpperAligners(0, 0).Build();

        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(6);
        expect(newState.lastUpperAligner).to.be.equal(0);
    });

    it('Should round down updated aligners', () => {
        const changedState = new VisitAlignerBuilder()
                                    .WithVisitInterval(63)
                                    .WithWearInterval(14).Build();

        const action = actions.actionCreators.updateAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(4);
        expect(newState.lastUpperAligner).to.be.equal(4);
    });

    it('Should update last lower aligner', () => {
        const changedState = new VisitAlignerBuilder()
                                    .WithFirstLowerAligner(4).Build();

        const action = actions.actionCreators.updateLowerAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastLowerAligner).to.be.equal(9);
    });

    it('Should update last upper aligner', () => {
        const changedState = new VisitAlignerBuilder()
                                    .WithFirstUpperAligner(4).Build();

        const action = actions.actionCreators.updateUpperAligners(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.lastUpperAligner).to.be.equal(9);
    });

    it('Should update wear interval', () => {
        const changedState = new VisitAlignerBuilder()
                                    .WithUpperAligners(1,4)
                                    .WithLowerAligners(1,4).Build();

        const action = actions.actionCreators.updateWearInterval(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.wearInterval).to.be.equal(21);
    });

    it('Should update visit interval', () => {
        const changedState = new VisitAlignerBuilder().Build();
        const action = actions.actionCreators.updateVisitInterval(changedState);

        const newState = reducer.reducer(initialState, action);

        expect(newState.visitInterval).to.be.equal(56);
    });
});