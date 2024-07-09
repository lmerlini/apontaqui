import { createStore } from 'vuex';

import users from "./users.js";
import theme from './dashboard/theme.js';
import clients from './dashboard/clients.js';
import works from './dashboard/works.js';
import projects from './dashboard/projects.js';



export default createStore({
    modules: {
        users,
        theme,
        clients,
        works,
        projects
    }
})