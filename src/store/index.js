import { createStore } from 'vuex';

import users from "./users";
import theme from './dashboard/theme.js';
import clients from './dashboard/clients.js';
import works from './dashboard/works.js';



export default createStore({
    modules: {
        users,
        theme,
        clients,
        works
    }
})