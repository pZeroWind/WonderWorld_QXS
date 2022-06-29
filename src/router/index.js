import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/library',
    name: "library",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LibraryView.vue')
  },
  {
    path: "/library/book/:bookId",
    name: "book",
    component: () => import(/* webpackChunkName: "about" */ '../views/BookView.vue'),
  },
  {
    path: "/library/:bookId/:scrollId/:chapterId",
    name: "chapter",
    component: () => import(/* webpackChunkName: "about" */ '../views/ChapterView.vue'),
  },
  {
    path: "/personCenter/writer",
    name: "writer",
    component: () => import(/* webpackChunkName: "about" */ '../views/WriterView.vue'),
  },
  {
    path: "/personCenter/book/:bookId",
    name: "writeBook",
    component: () => import(/* webpackChunkName: "about" */ '../views/BookDataView.vue'),
  },
  {
    path: "/personCenter/editor/:bookId/:scrollId/",
    name: "bookwriter",
    component: () => import(/* webpackChunkName: "about" */ '../views/BookWriteView.vue'),
  },
  {
    path: "/personCenter/editor/:bookId/:scrollId/:chapterId",
    name: "bookwriter2",
    component: () => import(/* webpackChunkName: "about" */ '../views/BookWriteView.vue'),
  },
  {
    path: "/password/forget",
    name: "forget",
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgetView.vue'),
  },
  {
    path: "/person/:id",
    name: "personCenter",
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonCenter.vue'),
  },
  {
    path: "/person",
    name: "personCenter",
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonCenter.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
