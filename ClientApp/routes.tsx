import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import AlignerCalculator from './alignercalculator/AlignerCalculatorContainer';

export default <Route component={ Layout }>
    <Route path='/' components={{ body: Home }} />
    <Route path='/alignercalculator' components={{ body: AlignerCalculator }} />
            <Route path='(:startDateIndex)' /> { /* Optional route segment that does not affect NavMenu highlighting */ }
    </Route>

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}
