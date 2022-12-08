<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Posts List</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12" style="padding-bottom:20px">
                        <router-link :to="{ name: 'create posts' }" class="btn btn-success">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;New Post
                        </router-link>
                    </div>
                    <div class="col-lg-12">
                        <table class="table table-striped text-left">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th width="30%">Name</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th width="20%" class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="post in posts" :key="post.id">
                                    <td>{{ post.id }}</td>
                                    <td>{{ post.name }}</td>
                                    <td>{{ post.description }}</td>
                                    <td>
                                        <div v-if="post.state == '1'">
                                            Publicado</div>
                                        <div v-else>
                                            Not published
                                        </div>
                                    </td>
                                    <td>{{ post.name_category }}</td>
                                    <td>{{ post.name_author }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'edit posts', params: { id: post.id } }"
                                            class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o"
                                                aria-hidden="true"></i></router-link>&nbsp;
                                        <button class="btn btn-danger btn-sm" v-on:click="deletePost(post.id)">
                                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                                        </button>&nbsp;
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            posts: [],
        };
    },

    created: function () {
        this.getPosts();
        this.getUser();
    },
    methods: {
        getUser(){
            var token =localStorage.getItem('token')
            if(!token){
                this.$router.push('/login');
            }
        },
        getPosts() {
            fetch("http://127.0.01:8000/api/posts", {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.getItem('token')
                    },
                })
                .then((response) => response.json())
                .then((dataResponse) => {
                    console.log(dataResponse.posts)
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    this.posts = dataResponse.posts;
                })
        },
        deletePost(id) {
            if (confirm("Are you sure to delete the post?")) {
                fetch("http://127.0.01:8000/api/posts/" + id, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                    .then((response) => response.json())
                    .then((dataResponse) => {
                        console.log(dataResponse);
                        if(dataResponse.status){
                        this.$router.push('/login');
                    }
                        window.location.href = 'posts'
                    })
            }
        }
    }
}
</script>