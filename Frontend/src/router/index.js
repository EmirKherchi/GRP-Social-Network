import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/Posts.vue')
  },
  {
    path: "/posts/:id",
    name: "PostId",

    component: () => import("../views/PostId.vue"),
  },
  {
    path: "/newpost",
    name: "NewPost",

    component: () => import("../views/NewPost.vue"),
  },
  {
    path: "/connexion",
    name: "Connexion",

    component: () => import("../views/Connexion.vue"),
  },
  {
    path: "/inscription",
    name: "Inscription",

    component: () => import("../views/Inscription.vue"),
  },
  {
    path: "/userboard",
    name: "UserBoard",

    component: () => import("../views/UserBoard.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// Vérifie que l'user est connecté sinon renvoi vers la page de connexion
router.beforeEach((to, from, next) => {
  const publicPages = ['/connexion', '/inscription'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/connexion');
  } else {
    next();
  }
});

export default router
