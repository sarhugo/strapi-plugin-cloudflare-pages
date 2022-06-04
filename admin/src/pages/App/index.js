/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoadingIndicatorPage, useRBAC, NotFound } from '@strapi/helper-plugin';
import pluginPermissions from '../../permissions';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

const App = () => {
  const state = useRBAC(pluginPermissions);

  if (state.isLoading) {
    return <LoadingIndicatorPage />;
  }

  if (state.allowedActions.canAccessMain) {
   return (
     <div>
       <Switch>
         <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
         <Route component={NotFound} />
       </Switch>
     </div>
   );
  }

  return <Redirect to="/" />;
};
 
 export default App;
 