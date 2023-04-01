import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('src/pages/LoginPage.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('src/pages/HomePage.vue')
      },
      {
        path: 'user/:userId',
        children: [
          {
            path: 'profile',
            name: 'user-profile',
            component: () => import('src/pages/UserProfile.vue'),
          },
        ]
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('src/pages/AdminPage.vue'),
      }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
