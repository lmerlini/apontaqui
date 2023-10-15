import { createRouter, createWebHistory } from 'vue-router'


import Home from '@/views/Home.vue'
import tokenService from '@/services/_token';
import store from '@/store/index'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'Aponta aqui',
        component: () => import('@/views/private/Dashboard.vue'),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: async (to, from, next) => {
            if (!store.getters['users/token']) {
                await store.dispatch('users/fetchUser');
            }
            next();
        },
        children: [
            {
                path: 'clientes',
                name: 'Clientes',
                component: () => import('@/views/private/Clientes.vue')
            },
            {
                path: 'usuarios',
                name: 'Usuários',
                component: () => import('@/views/private/Usuarios.vue')
            }, {
                path: 'apontamentos',
                name: 'Apontamentos',
                // component: () => import('@/views/private/works/Apontamentos.vue'),
                children: [
                    { path: 'apontar', name: 'Apontar', component: () => import('@/views/private/works/CreateWork.vue') },
                    { path: 'atualizar', name: 'Atualizar', component: () => import('@/views/private/works/UpdateWork.vue') },
                    { path: 'deletar', name: 'Deletar', component: () => import('@/views/private/works/DeleteWork.vue') },
                    { path: 'listar', name: 'Listar', component: () => import('@/views/private/works/ReadWork.vue') },
                ]
            },
        ]
    },

]

const router = new createRouter({
    routes,
    history: createWebHistory()
})


const isAuthenticated = () => {
    return tokenService.getToken();
};


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
});

export default router