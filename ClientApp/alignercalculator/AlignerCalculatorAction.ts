import { Action } from 'redux';
import { VisitAligner } from './alignerVisitModel'

interface UpdateAlignersAction { type: 'UPDATE_ALIGNERS', visitAligner: VisitAligner }
interface UpdateVisitIntervalAction { type: 'UPDATE_VISIT_INTERVAL', visitAligner: VisitAligner }
interface UpdateWearIntervalAction { type: 'UPDATE_WEAR_INTERVAL', visitAligner: VisitAligner }

export type KnownAction = UpdateAlignersAction | UpdateVisitIntervalAction | UpdateWearIntervalAction;

export const actionCreators = {
    updateAligners: (visitAligner: VisitAligner ) => <UpdateAlignersAction>{ type: 'UPDATE_ALIGNERS', visitAligner },
    updateVisitInterval: (visitAligner: VisitAligner ) => <UpdateVisitIntervalAction>{ type: 'UPDATE_VISIT_INTERVAL', visitAligner },
    updateWearInterval: (visitAligner: VisitAligner ) => <UpdateWearIntervalAction>{ type: 'UPDATE_WEAR_INTERVAL', visitAligner }
};