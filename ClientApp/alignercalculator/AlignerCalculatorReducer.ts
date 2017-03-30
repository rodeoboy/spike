import { Reducer } from 'redux';
import { KnownAction } from './AlignerCalculatorAction'
import { VisitAligner } from './alignerVisitModel'

// This default values can be removed when state is coming down from the server
const visitAligner : VisitAligner  = {
            visitInterval : 56,
            wearInterval : 14,
            firstUpperAligner : 1,
            lastUpperAligner : 4,
            firstLowerAligner : 1,
            lastLowerAligner : 4,     
            planLowerStart : 1,
            planUpperStart : 1,
            planLowerEnd : 40,
            planUpperEnd : 40,
            previousUpper : 0,
            previousLower : 0,
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
        planLowerEnd : 0,
        planUpperEnd : 0,
        previousUpper : 0,
        previousLower : 0,
        treatmentVisitInteval : 0,
        treatmentWearInterval : 0,   
        isMidTreatment : false,    
    };
    switch (action.type) {
        case 'UPDATE_ALIGNERS': 
            var aligners = Object.assign({}, action.visitAligner );
            var alingerCount = Math.floor(aligners.visitInterval / aligners.wearInterval - 1);

            updateAligners(aligners);

            return Object.assign({}, state, aligners);
        case 'UPDATE_UPPER_ALIGNERS':
            var aligners = Object.assign({}, action.visitAligner );

            updateLastUpperAligner(aligners);

            return Object.assign({}, state, aligners);
        case 'UPDATE_LOWER_ALIGNERS':
            var aligners = Object.assign({}, action.visitAligner );
            
            updateLastLowerAligner(aligners);

            return Object.assign({}, state, aligners);
        case 'UPDATE_VISIT_INTERVAL':
            var aligners = Object.assign({}, action.visitAligner );
            var count = getMaxAlignerCount(action.visitAligner);

            aligners.visitInterval = Math.floor(aligners.wearInterval * count);

            return Object.assign({}, state, aligners);
        case 'UPDATE_WEAR_INTERVAL':
            var aligners = Object.assign({}, action.visitAligner );
            var count = getMaxAlignerCount(action.visitAligner);

            aligners.wearInterval = Math.floor(aligners.visitInterval / count);

            return Object.assign({}, state, aligners);
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    function updateLastUpperAligner(aligners) {
        var alingerCount = Math.floor(aligners.visitInterval / aligners.wearInterval - 1);
        
        if (aligners.firstUpperAligner !== 0)
            aligners.lastUpperAligner = aligners.firstUpperAligner + alingerCount;

        if (aligners.lastUpperAligner > aligners.planUpperEnd)
            aligners.lastUpperAligner = aligners.planUpperEnd;
    }

    function updateLastLowerAligner(aligners) {
        var alingerCount = Math.floor(aligners.visitInterval / aligners.wearInterval - 1);
        
        if (aligners.firstLowerAligner !== 0)
            aligners.lastLowerAligner = aligners.firstLowerAligner + alingerCount;

        if (aligners.lastLowerAligner > aligners.planLowerEnd)
            aligners.lastLowerAligner = aligners.planLowerEnd;
    }
    
    function updateAligners(aligners) {
    
        updateLastUpperAligner(aligners);

        updateLastLowerAligner(aligners);

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