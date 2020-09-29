import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c0c05c7a = () => interopDefault(import('../admin/pages/admins/index.vue' /* webpackChunkName: "pages/admins/index" */))
const _43fc2478 = () => interopDefault(import('../admin/pages/forgetpassword.vue' /* webpackChunkName: "pages/forgetpassword" */))
const _527cfd5d = () => interopDefault(import('../admin/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _34f91300 = () => interopDefault(import('../admin/pages/mycourses.vue' /* webpackChunkName: "pages/mycourses" */))
const _04fd7b42 = () => interopDefault(import('../admin/pages/register.vue' /* webpackChunkName: "pages/register" */))
const _70f4bcc8 = () => interopDefault(import('../admin/pages/admins/dashboard/index.vue' /* webpackChunkName: "pages/admins/dashboard/index" */))
const _694774da = () => interopDefault(import('../admin/pages/admins/login.vue' /* webpackChunkName: "pages/admins/login" */))
const _f3fdbd9e = () => interopDefault(import('../admin/pages/admins/dashboard/courses/index.vue' /* webpackChunkName: "pages/admins/dashboard/courses/index" */))
const _48efbe15 = () => interopDefault(import('../admin/pages/admins/dashboard/students/index.vue' /* webpackChunkName: "pages/admins/dashboard/students/index" */))
const _61d74fad = () => interopDefault(import('../admin/pages/admins/dashboard/courses/create.vue' /* webpackChunkName: "pages/admins/dashboard/courses/create" */))
const _0687616e = () => interopDefault(import('../admin/pages/admins/dashboard/students/create.vue' /* webpackChunkName: "pages/admins/dashboard/students/create" */))
const _2fd788c8 = () => interopDefault(import('../admin/pages/admins/dashboard/courses/_id/index.vue' /* webpackChunkName: "pages/admins/dashboard/courses/_id/index" */))
const _26e1c680 = () => interopDefault(import('../admin/pages/admins/dashboard/students/_id/index.vue' /* webpackChunkName: "pages/admins/dashboard/students/_id/index" */))
const _26e43c6e = () => interopDefault(import('../admin/pages/reset/_id.vue' /* webpackChunkName: "pages/reset/_id" */))
const _ee554b74 = () => interopDefault(import('../admin/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admins",
    component: _c0c05c7a,
    name: "admins"
  }, {
    path: "/forgetpassword",
    component: _43fc2478,
    name: "forgetpassword"
  }, {
    path: "/login",
    component: _527cfd5d,
    name: "login"
  }, {
    path: "/mycourses",
    component: _34f91300,
    name: "mycourses"
  }, {
    path: "/register",
    component: _04fd7b42,
    name: "register"
  }, {
    path: "/admins/dashboard",
    component: _70f4bcc8,
    name: "admins-dashboard"
  }, {
    path: "/admins/login",
    component: _694774da,
    name: "admins-login"
  }, {
    path: "/admins/dashboard/courses",
    component: _f3fdbd9e,
    name: "admins-dashboard-courses"
  }, {
    path: "/admins/dashboard/students",
    component: _48efbe15,
    name: "admins-dashboard-students"
  }, {
    path: "/admins/dashboard/courses/create",
    component: _61d74fad,
    name: "admins-dashboard-courses-create"
  }, {
    path: "/admins/dashboard/students/create",
    component: _0687616e,
    name: "admins-dashboard-students-create"
  }, {
    path: "/admins/dashboard/courses/:id",
    component: _2fd788c8,
    name: "admins-dashboard-courses-id"
  }, {
    path: "/admins/dashboard/students/:id",
    component: _26e1c680,
    name: "admins-dashboard-students-id"
  }, {
    path: "/reset/:id?",
    component: _26e43c6e,
    name: "reset-id"
  }, {
    path: "/",
    component: _ee554b74,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
