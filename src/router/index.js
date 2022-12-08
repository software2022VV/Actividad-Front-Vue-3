import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'

import ListCategories from '../views/categories/ListCategories.vue'
import CreateCategories from '../views/categories/CreateCategory.vue'
import EditCategories from '../views/categories/EditCategory.vue'

import ListPosts from '../views/posts/ListPosts.vue'
import CreatePosts from '../views/posts/CreatePost.vue'
import EditPosts from '../views/posts/EditPost.vue'

import ListUsers from '../views/users/ListUsers.vue'
import CreateUsers from '../views/users/CreateUser.vue'
import ShowUser from '../views/users/ShowUser.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/categories',
    name: 'categories',
    component: ListCategories
  },
  {
    path: '/categories/create',
    name: 'create categories',
    component: CreateCategories
  },
  {
    path: '/categories/edit/:id',
    name: 'edit categories',
    component: EditCategories
  },
  {
    path: '/posts',
    name: 'posts',
    component: ListPosts
  },
  {
    path: '/posts/create',
    name: 'create posts',
    component: CreatePosts
  },
  {
    path: '/posts/edit/:id',
    name: 'edit posts',
    component: EditPosts
  },
  {
    path: '/users',
    name: 'users',
    component: ListUsers
  },
  {
    path: '/users/create',
    name: 'create users',
    component: CreateUsers
  },
  {
    path: '/users/show',
    name: 'show user',
    component: ShowUser
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
