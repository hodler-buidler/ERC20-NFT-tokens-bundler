import { RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/layouts/HomeLayout/HomeLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '/',
        component: () => import('@/pages/HomePage/HomePage.vue'),
      },
    ],
  },
];

export default routes;
