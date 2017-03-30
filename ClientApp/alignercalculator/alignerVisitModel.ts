
export interface AlignerProps {
    visitAligner : VisitAligner;
    updateAligners : (aligner : VisitAligner) => void;
    updateUpperAligners : (aligner : VisitAligner) => void;
    updateVisitInterval : (aligner : VisitAligner) => void;
    updateWearInterval : (aligner : VisitAligner) => void;
    updateLowerAligners : (aligner : VisitAligner) => void;
}

export interface VisitAligner {
    visitInterval : number;
    wearInterval : number;
    firstUpperAligner : number;
    lastUpperAligner : number;
    firstLowerAligner : number;
    lastLowerAligner : number; 
    planLowerStart : number;
    planUpperStart : number;
    planLowerEnd : number;
    planUpperEnd : number;
    previousUpper : number;
    previousLower : number;
    treatmentVisitInteval : number;
    treatmentWearInterval : number;
    isMidTreatment : boolean;
}