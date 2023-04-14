import { RouteRecordRaw } from 'vue-router';
import { AdminTiles, EventsTiles } from 'src/data/adminConfig';
import { checkAuthentication, allowRoles } from './auth';
import { role } from 'src/types/dbTypes';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('src/pages/auth/LoginPage.vue'),
        props: {
          form: 'login',
        }
      }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('src/pages/auth/LoginPage.vue'),
        props: {
          form: 'register',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: checkAuthentication,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('src/pages/HomePage.vue')
      },
      {
        path: 'user',
        children: [
          {
            path: 'settings',
            name: 'user-settings',
            component: () => import('src/pages/user/UserSettings.vue'),
          },
          {
            path: 'id/:userId',
            children: [
              {
                path: 'profile',
                name: 'user-profile',
                component: () => import('src/pages/user/UserProfile.vue'),
              },
            ]
          }
        ]
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/SimpleLayout.vue'),
    beforeEnter: [checkAuthentication, (to, from, next) => allowRoles([role.admin, role.coach], to, from, next)],
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('src/pages/admin/AdminPage.vue'),
        props: {
          tiles: AdminTiles,
        },
      },
      {
        path: 'events',
        name: 'admin-events',
        component: () => import('src/pages/admin/AdminPage.vue'),
        props: {
          tiles: EventsTiles,
        },
      },
      {
        path: 'events/create',
        name: 'create-event',
        component: () => import('src/pages/admin/events/CreateEventPage.vue'),
      },
      {
        path: 'events/today',
        name: 'today-agenda',
        component: () => import('src/pages/admin/events/TodayAgendaPage.vue'),
      },
      {
        path: 'events/myEvents',
        name: 'events-crud',
        component: () => import('src/pages/admin/events/MyEventsCrud.vue'),
      },

      {
        path: 'users',
        name: 'users-crud',
        component: () => import('src/pages/admin/UsersCrudPage.vue'),
      },
      {
        path: 'groups',
        name: 'groups-crud',
        component: () => import('src/pages/admin/GroupsCrudPage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
