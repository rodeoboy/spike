import { Action } from 'redux';
import { VisitAligner } from './alignerVisitModel'

interface UpdateAlignersAction { type: 'UPDATE_ALIGNERS', visitAligner: VisitAligner }
interface UpdateUpperAlignersAction { type: 'UPDATE_UPPER_ALIGNERS', visitAligner: VisitAligner }
interface UpdateLowerAlignersAction { type: 'UPDATE_LOWER_ALIGNERS', visitAligner: VisitAligner }
interface UpdateVisitIntervalAction { type: 'UPDATE_VISIT_INTERVAL', visitAligner: VisitAligner }
interface UpdateWearIntervalAction { type: 'UPDATE_WEAR_INTERVAL', visitAligner: VisitAligner }

export type KnownAction = UpdateAlignersAction | UpdateUpperAlignersAction | UpdateLowerAlignersAction | UpdateVisitIntervalAction | UpdateWearIntervalAction;

export const actionCreators = {
    updateAligners: (visitAligner: VisitAligner ) => <UpdateAlignersAction>{ type: 'UPDATE_ALIGNERS', visitAligner },
    updateUpperAligners: (visitAligner: VisitAligner ) => <UpdateUpperAlignersAction>{ type: 'UPDATE_UPPER_ALIGNERS', visitAligner },
    updateLowerAligners: (visitAligner: VisitAligner ) => <UpdateLowerAlignersAction>{ type: 'UPDATE_LOWER_ALIGNERS', visitAligner },
    updateVisitInterval: (visitAligner: VisitAligner ) => <UpdateVisitIntervalAction>{ type: 'UPDATE_VISIT_INTERVAL', visitAligner },
    updateWearInterval: (visitAligner: VisitAligner ) => <UpdateWearIntervalAction>{ type: 'UPDATE_WEAR_INTERVAL', visitAligner }
};