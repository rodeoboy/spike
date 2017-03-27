import { Reducer } from 'redux';
import { KnownAction } from './AlignerCalculatorAction'
import { VisitAligner } from './alignerVisitModel'

const visitAligner : VisitAligner  = {
            visitInterval : 8,
            wearInterval : 2,
            firstUpperAligner : 1,
            lastUpperAligner : 1,
            firstLowerAligner : 1,
            lastLowerAligner : 1,     
            planLowerStart : 1,
            planUpperStart : 1,
            treatmentVisitInteval : 8,
            treatmentWearInterval : 2,   
            isMidTreatment : false,    
        };

const INITIAL_STATE = { visitAligner: visitAligner };

export const reducer: Reducer<VisitAligner> = (state: VisitAligner = visitAligner, action: KnownAction) => {

    const unloadedState : VisitAligner  = {
        visitInterval : 0,
        wearInterval : 0,
        firstUpperAligner : 0,
        lastUpperAligner : 0,
        firstLowerAligner : 0,
        lastLowerAligner : 0,     
        planLowerStart : 0,
        planUpperStart : 0,
        treatmentVisitInteval : 0,
        treatmentWearInterval : 0,   
        isMidTreatment : false,    
    };
    switch (action.type) {
        case 'UPDATE_ALIGNERS': 
            var aligners = Object.assign({}, action.visitAligner )
            var alingerCount = aligners.visitInterval / aligners.wearInterval - 1;

            if (aligners.firstUpperAligner !== 0)
                aligners.lastUpperAligner = aligners.firstUpperAligner + alingerCount;

            if (aligners.firstLowerAligner !== 0)
                aligners.lastLowerAligner = aligners.firstLowerAligner + alingerCount;

            //Set the last number on upper the same as lower for staggared starts
            if (aligners.firstUpperAligner > aligners.firstLowerAligner &&
                aligners.lastLowerAligner >= aligners.firstUpperAligner ) {
                    aligners.lastUpperAligner = aligners.lastLowerAligner;
            }

            //Set the last number on upper the same as lower for staggared starts
            if (aligners.firstLowerAligner > aligners.firstUpperAligner &&
                aligners.lastUpperAligner >= aligners.firstLowerAligner ) {
                    aligners.lastLowerAligner = aligners.lastUpperAligner;
            }

            return Object.assign({}, state, aligners);
        case 'UPDATE_VISIT_INTERVAL':
            var count = getMaxAlignerCount(action.visitAligner);

            action.visitAligner.visitInterval = Math.floor(count * action.visitAligner.wearInterval);

            return Object.assign({}, state, action.visitAligner);
        case 'UPDATE_WEAR_INTERVAL':
            var count = getMaxAlignerCount(action.visitAligner);

            action.visitAligner.wearInterval = Math.floor(action.visitAligner.visitInterval / count);

            return Object.assign({}, state, action.visitAligner);
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    function getMaxAlignerCount(state) {
        var uppperCount = state.lastUpperAligner - state.firstUpperAligner + 1;
        var lowerCount = state.lastLowerAligner - state.firstLowerAligner + 1;

        return Math.max(uppperCount, lowerCount);
    }
    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};