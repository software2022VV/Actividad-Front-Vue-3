<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <span class="navbar-brand">Front VueJs</span>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/categories" class="nav-link">Categories</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/posts" class="nav-link">Posts</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/users" class="nav-link">Users</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/users/show" class="nav-link">Profile</router-link>
      </li>
    </ul>
  </div>
</nav>
  <router-view/>
</template>

<style>
nav {
  padding: 30px;
}
</style>
