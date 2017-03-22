import { Reducer } from 'redux';
import { KnownAction } from './AlignerCalculatorAction'
import { VisitAligner } from './alignerVisitModel'

export const visitAlignerReducer: Reducer<VisitAligner> = (state: VisitAligner, action: KnownAction) => {
    var updatedState = Object.assign({}, state);

    switch (action.type) {
        case 'UPDATE_ALIGNERS':
            var alingerCount = action.visitAligner.visitInterval / action.visitAligner.wearInterval - 1;

            updatedState.lastUpperAligner = action.visitAligner.firstUpperAligner
            updatedState.lastLowerAligner = action.visitAligner.firstLowerAligner

            if (action.visitAligner.firstUpperAligner !== 0)
                updatedState.lastUpperAligner += alingerCount;

            if (action.visitAligner.firstLowerAligner !== 0)
                updatedState.lastLowerAligner += alingerCount;

            //Set the last number on upper the same as lower for staggared starts
            if (state.firstUpperAligner > state.firstLowerAligner &&
                updatedState.lastLowerAligner >= state.firstUpperAligner ) {
                    updatedState.lastUpperAligner = updatedState.lastLowerAligner;
            }

            //Set the last number on upper the same as lower for staggared starts
            if (state.firstLowerAligner > state.firstUpperAligner &&
                updatedState.lastUpperAligner >= state.firstLowerAligner ) {
                    updatedState.lastLowerAligner = updatedState.lastUpperAligner;
            }


            return updatedState;
        case 'UPDATE_VISIT_INTERVAL':
            var count = getMaxAlignerCount(action.visitAligner);

            updatedState.visitInterval = Math.floor(count * action.visitAligner.wearInterval);
            return updatedState;
        case 'UPDATE_WEAR_INTERVAL':
            var count = getMaxAlignerCount(action.visitAligner);

            updatedState.wearInterval = Math.floor(action.visitAligner.visitInterval / count);
            return updatedState;
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
    return state ;
};