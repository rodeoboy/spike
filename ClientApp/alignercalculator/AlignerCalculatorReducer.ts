import { Reducer } from 'redux';
import { KnownAction } from './AlignerCalculatorAction'
import { VisitAligner } from './alignerVisitModel'

export const reducer: Reducer<VisitAligner> = (state: VisitAligner, action: KnownAction) => {

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
            var alingerCount = action.visitAligner.visitInterval / action.visitAligner.wearInterval - 1;

            if (action.visitAligner.firstUpperAligner !== 0)
                action.visitAligner.lastUpperAligner = action.visitAligner.firstUpperAligner + alingerCount;

            if (action.visitAligner.firstLowerAligner !== 0)
                action.visitAligner.lastLowerAligner = action.visitAligner.firstLowerAligner + alingerCount;
            debugger;
            //Set the last number on upper the same as lower for staggared starts
            if (action.visitAligner.firstUpperAligner > action.visitAligner.firstLowerAligner &&
                action.visitAligner.lastLowerAligner >= action.visitAligner.firstUpperAligner ) {
                    action.visitAligner.lastUpperAligner = action.visitAligner.lastLowerAligner;
            }

            //Set the last number on upper the same as lower for staggared starts
            if (action.visitAligner.firstLowerAligner > action.visitAligner.firstUpperAligner &&
                action.visitAligner.lastUpperAligner >= action.visitAligner.firstLowerAligner ) {
                    action.visitAligner.lastLowerAligner = action.visitAligner.lastUpperAligner;
            }

            return Object.assign({}, state, action.visitAligner);
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