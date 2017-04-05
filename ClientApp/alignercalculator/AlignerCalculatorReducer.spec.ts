import {expect, assert} from 'chai';
import * as reducer from './AlignerCalculatorReducer';
import * as actions from './AlignerCalculatorAction';
import { VisitAligner } from './alignerVisitModel';
import VisitAlignerBuilder from './VisitAlignerBuilder';

describe ('Aligner Calculator Reducer', () => {
    const initialState = new VisitAlignerBuilder().Build();

    describe('updateAligners', () => {
        const action = actions.actionCreators.updateAligners;

        beforeEach(() => {

        });

        it('Should update with wear interval in weeks', () => {
            const changedState = new VisitAlignerBuilder()
                                .WithWearIntervalInDays(false)
                                .WithWearInterval(25).Build();
            const action = actions.actionCreators.updateAligners(changedState);

            const newState = reducer.reducer(initialState, action);

            expect(newState.lastLowerAligner).to.be.equal(3);
            expect(newState.lastUpperAligner).to.be.equal(3);
        });

        it('Should update', () => {
            const changedState = new VisitAlignerBuilder().Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(6);
            expect(newState.lastUpperAligner).to.be.equal(6);
        });
        
        it('Should update lower last aligners for staggered start', () => {
            const changedState = new VisitAlignerBuilder()
                                    .WithLowerAligners(4, 4).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(6);
            expect(newState.lastUpperAligner).to.be.equal(6);
        });
        
        it('Should update upper last aligners for staggered start', () => {
            const changedState = new VisitAlignerBuilder()
                                    .WithUpperAligners(4, 4).Build();
                                    
            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(6);
            expect(newState.lastUpperAligner).to.be.equal(6);
        });
        
        it('Should update last aligners with no lower tray', () => {
            const changedState = new VisitAlignerBuilder()
                                    .WithLowerAligners(0, 0).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(0);
            expect(newState.lastUpperAligner).to.be.equal(6);
        });
        
        it('Should update last aligners with no upper tray', () => {
            const changedState = new VisitAlignerBuilder()
                                    .WithUpperAligners(0, 0).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(6);
            expect(newState.lastUpperAligner).to.be.equal(0);
        });

        it('Should round down updated aligners', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithVisitInterval(63)
                                        .WithWearInterval(14).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(4);
            expect(newState.lastUpperAligner).to.be.equal(4);
        });
    });

    describe('updateUpperAligners', () => {
        const action = actions.actionCreators.updateUpperAligners;

        it('Should update ', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithFirstUpperAligner(4).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastUpperAligner).to.be.equal(9);
        });

        it('Should prevent last aligner to be calculated greater than plan end value', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithPlanUpperEnd(10)
                                        .WithFirstUpperAligner(8).Build();

            const newState = reducer.reducer(initialState, action(changedState)); 

            expect(newState.lastUpperAligner).to.be.equal(10);                       
        });
    });

    describe('updateLowerAligners', () => {
        const action = actions.actionCreators.updateLowerAligners;

        it('Should update ', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithFirstLowerAligner(4).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(9);
        });

        it('Should prevent last aligner to be calculated greater than plan end value', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithPlanLowerEnd(10)
                                        .WithFirstLowerAligner(8).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.lastLowerAligner).to.be.equal(10);                       
        });
    });

    describe('updateWearInterval', () => {
        const action = actions.actionCreators.updateWearInterval;

        it('Should update wear interval with alingers', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithUpperAligners(1,4)
                                        .WithLowerAligners(1,4).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.wearInterval).to.be.equal(21);
        });

        it('Should update wear interval with visit interval', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithVisitInterval(42).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.wearInterval).to.be.equal(10);
        });
    });
    

    describe('update visit interval', () => {
        const action = actions.actionCreators.updateVisitInterval;

        it('Should update visit interval with aligners', () => {
            const changedState = new VisitAlignerBuilder()
                                        .WithUpperAligners(1,4)
                                        .WithLowerAligners(1,4).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.visitInterval).to.be.equal(56);
        });

        it('Should update visit interval with wear interval', () => {
            const changedState = new VisitAlignerBuilder()
                                    .WithWearInterval(7).Build();

            const newState = reducer.reducer(initialState, action(changedState));

            expect(newState.visitInterval).to.be.equal(28);
        });
    });
});