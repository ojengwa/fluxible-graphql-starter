import Fluxible from 'fluxible';
var fetchrPlugin = require('fluxible-plugin-fetchr');

import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

// Rest API Path
app.plug(fetchrPlugin({
    xhrPath: '/api'
}));


// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);

export default app;
