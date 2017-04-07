import { VisitAligner } from './alignerVisitModel';

export default class VisitAlignerBuilder {
    visitAligner : VisitAligner;
    constructor() {
        this.visitAligner = {
            visitInterval : 84,
            visitIntervalInDays : true,
            wearInterval : 14,
            wearIntervalInDays : true,
            firstUpperAligner : 1,
            lastUpperAligner : 4,
            firstLowerAligner : 1,
            lastLowerAligner : 4,     
            planLowerStart : 1,
            planUpperStart : 1,
            planLowerEnd : 40,
            planUpperEnd : 40,
            previousUpper : 4,
            previousLower : 4,
            treatmentVisitInteval : 8,
            treatmentWearInterval : 2,  
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

    WithVisitIntervalInDays (isInDays : boolean) {
        this.visitAligner.visitIntervalInDays = isInDays;
        return this;
    }

    WithWearIntervalInDays (isInDays : boolean) {
        this.visitAligner.wearIntervalInDays = isInDays;
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

    WithFirstUpperAligner (first : number) {
        this.visitAligner.firstUpperAligner = first;
        return this;
    }

    WithFirstLowerAligner (first : number) {
        this.visitAligner.firstLowerAligner = first;
        return this;
    }

    WithPlanUpperStart (value : number) {
        this.visitAligner.planUpperStart = value;
        return this
    }

    WithPlanLowerStart (value : number) {
        this.visitAligner.planLowerStart = value;
        return this
    }

    WithPlanUpperEnd (value : number) {
        this.visitAligner.planUpperEnd = value;
        return this
    }

    WithPlanLowerEnd (value : number) {
        this.visitAligner.planLowerEnd = value;
        return this
    }

    WithTreatmentVisitInterval (value : number) {
        this.visitAligner.treatmentVisitInteval = value;
        return this
    }

    WithTreatmentWearInterval (value : number) {
        this.visitAligner.treatmentWearInterval = value;
        return this
    }

    Build ()  {
        return this.visitAligner;
    }
}