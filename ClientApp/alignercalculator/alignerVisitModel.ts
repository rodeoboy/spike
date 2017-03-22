
export interface VisitAligner {
    visitInterval : number;
    wearInterval : number;
    firstUpperAligner : number;
    lastUpperAligner : number;
    firstLowerAligner : number;
    lastLowerAligner : number; 
    planLowerStart : number;
    planUpperStart : number;
    treatmentVisitInteval : number;
    treatmentWearInterval : number;
    isMidTreatment : boolean;
}