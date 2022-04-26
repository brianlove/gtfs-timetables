import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import RouteList from '../views/RouteList.vue';
import RouteDetailPage from '../views/RouteDetailPage.vue';
import TrainDetail from '../views/TrainDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/routes',
      name: 'routes',
      component: RouteList,
    },
    {
      path: '/routes/:id',
      name: 'routePage',
      component: RouteDetailPage,
      props: (route) => {
        const routeId = Number.parseInt(<string>route.params.id, 10);
        if ( Number.isNaN(routeId) ) {
          return 0;
        }
        return { routeId };
      },
    },
    {
      path: '/train/:id',
      name: 'train',
      component: TrainDetail,
      props: (route) => {
        const trainId = Number.parseInt(<string>route.params.id, 10);
        if ( Number.isNaN(trainId) ) {
          return 0;
        }
        return { trainId };
      },
    },
  ],
});

export default router
