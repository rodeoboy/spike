import { Reducer } from 'redux';
import { KnownAction } from './AlignerCalculatorAction'
import { VisitAligner } from './alignerVisitModel'

// This default values can be removed when state is coming down from the server
const visitAligner: VisitAligner = {
    visitInterval: 56,
    visitIntervalInDays: true,
    wearInterval: 14,
    wearIntervalInDays: true,
    firstUpperAligner: 1,
    lastUpperAligner: 4,
    firstLowerAligner: 1,
    lastLowerAligner: 4,
    planLowerStart: 1,
    planUpperStart: 1,
    planLowerEnd: 40,
    planUpperEnd: 40,
    previousUpper: 0,
    previousLower: 0,
    treatmentVisitInteval: 8,
    treatmentWearInterval: 2,
    isMidTreatment: false,
};

const INITIAL_STATE = { visitAligner: visitAligner };

export const reducer: Reducer<VisitAligner> = (state: VisitAligner = visitAligner, action: KnownAction) => {

    const unloadedState: VisitAligner = {
        visitInterval: 0,
        visitIntervalInDays: true,
        wearInterval: 0,
        wearIntervalInDays: true,
        firstUpperAligner: 0,
        lastUpperAligner: 0,
        firstLowerAligner: 0,
        lastLowerAligner: 0,
        planLowerStart: 0,
        planUpperStart: 0,
        planLowerEnd: 0,
        planUpperEnd: 0,
        previousUpper: 0,
        previousLower: 0,
        treatmentVisitInteval: 0,
        treatmentWearInterval: 0,
        isMidTreatment: false,
    };
    switch (action.type) {
        case 'UPDATE_ALIGNERS':
            return updateAligners(state, action.visitAligner);
        case 'UPDATE_UPPER_ALIGNERS':
            return updateLastUpperAligner(state, action.visitAligner);
        case 'UPDATE_LOWER_ALIGNERS':
            return updateLastLowerAligner(state, action.visitAligner);
        case 'UPDATE_VISIT_INTERVAL':
            return updateVisitInterval(state, action.visitAligner);
        case 'UPDATE_WEAR_INTERVAL':
            return updateWearInterval(state, action.visitAligner);
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};

function getAlignerCountByIntervals(visitAligner : VisitAligner) {
    return  Math.floor(visitAligner.visitInterval / visitAligner.wearInterval - 1);
}

function updateWearInterval(state, visitAligner) {
    let count = getMaxAlignerCount(visitAligner);

    let aligners = Object.assign({}, visitAligner, { wearInterval: Math.floor(visitAligner.visitInterval / count) });
    
    return Object.assign({}, state, aligners);
}

function updateVisitInterval(state, visitAligner) {
    let count = getMaxAlignerCount(visitAligner);
    let aligners = Object.assign({}, visitAligner, { visitInterval: Math.floor(visitAligner.wearInterval * count) });

    return Object.assign({}, state, aligners);
}

function updateLastUpper(visitAligner) {
    let alingerCount = getAlignerCountByIntervals(visitAligner);
    let lastUpperAligner = 0;
    let alingers;

    if (visitAligner.firstUpperAligner !== 0)
        lastUpperAligner = visitAligner.firstUpperAligner + alingerCount;

    if (lastUpperAligner > visitAligner.planUpperEnd)
        lastUpperAligner = visitAligner.planUpperEnd;

    return lastUpperAligner
}

function updateLastUpperAligner(state, visitAligner) {
    let aligners = Object.assign({}, visitAligner, { lastUpperAligner: updateLastUpper(visitAligner) });

    return Object.assign({}, state, aligners);
}

function updateLastLower(visitAligner) {
    let alingerCount = getAlignerCountByIntervals(visitAligner);
    let lastLowerAligner = 0;

    if (visitAligner.firstLowerAligner !== 0)
        lastLowerAligner = visitAligner.firstLowerAligner + alingerCount;

    if (lastLowerAligner > visitAligner.planLowerEnd)
        lastLowerAligner = visitAligner.planLowerEnd;

    return lastLowerAligner;
}

function updateLastLowerAligner(state, visitAligner) {
    let aligners = Object.assign({}, visitAligner, { lastLowerAligner: updateLastLower(visitAligner) });

    return Object.assign({}, state, aligners);
}

function updateAligners(state, visitAligner) {
    let lastUpper = updateLastUpper(visitAligner);
    let lastLower = updateLastLower(visitAligner);

    //Set the last number on upper the same as lower for staggared starts
    if (visitAligner.firstUpperAligner > visitAligner.firstLowerAligner &&
        lastLower >= visitAligner.firstUpperAligner) {
        lastUpper = lastLower;
    }

    //Set the last number on upper the same as lower for staggared starts
    if (visitAligner.firstLowerAligner > visitAligner.firstUpperAligner &&
        lastUpper >= visitAligner.firstLowerAligner) {
        lastLower = lastUpper;
    }

    let aligners = Object.assign({}, visitAligner, { lastUpperAligner: lastUpper, lastLowerAligner: lastLower });
    return Object.assign({}, state, aligners);
}

function  updateWearIntervalUnit(state, visitAligner) {

    let aligners = Object.assign({}, visitAligner, { wearIntervalInDays: visitAligner.wearIntervalInDays });
    return Object.assign({}, state, aligners);
}

function  updateVisitIntervalUnit(state, visitAligner) {

    let aligners = Object.assign({}, visitAligner, { visitIntervalInDays: visitAligner.visitIntervalInDays });
    return Object.assign({}, state, aligners);
}

function getMaxAlignerCount(visitAligner) {
    let uppperCount = visitAligner.lastUpperAligner - visitAligner.firstUpperAligner + 1;
    let lowerCount = visitAligner.lastLowerAligner - visitAligner.firstLowerAligner + 1;

    return Math.max(uppperCount, lowerCount);
}