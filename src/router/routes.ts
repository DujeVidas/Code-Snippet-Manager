import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/', redirect: '/login' },
      { path: 'login', component: () => import('src/pages/LoginPage.vue') },
      {
        path: 'register',
        component: () => import('src/pages/RegisterPage.vue'),
      },
    ],
    meta: { auth: false },
  },
  {
    path: '/app',
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: { auth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
