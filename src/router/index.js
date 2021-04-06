import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue';
import Introduction from '../components/Introduction.vue';
import Calories from '../components/Calories.vue';
import Food from '../components/Food.vue';
import UserList from '../components/admin/UserList.vue'
import Rights from '../components/admin/Rights.vue'
import Sport from '../components/admin/Sport.vue'
import Goods from '../components/admin/Goods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/Introduction",
    component: Introduction
  },
  {
    path: "/calories",
    component: Calories
  },
  {
    path: "/food",
    component: Food
  },
  {
    path: "/home",
    component: Home,
    redirect: "/Welcome",
    children: [
      {
        path: "/Welcome", 
        component: Welcome,
      },
      {
        path: "/user",
        component: UserList,
      },
      {
        path: "/rights",
        component: Rights,
      },
      {
        path: "/sport",
        component: Sport,
      },
      {
        path: "/goods",
        component: Goods,
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next();
  const userFlag = window.sessionStorage.getItem("user");
  if (!userFlag) return next("/login");
  next();
})

export default router
