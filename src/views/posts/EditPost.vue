<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Edit Post</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div v-for="(errorArray, idx) in errorMsg" :key="idx">
                            <div v-for="(allErrors, idx) in errorArray" :key="idx">
                                <span class="text-danger">{{ allErrors }} </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <form v-on:submit.prevent="editPost">
                            <div class="form-group">
                                <label for="">Name:</label>
                                <input type="text" class="form-control" name="name" v-model="post.name">
                            </div>
                            <div class="form-group">
                                <label for="">Description:</label>
                                <textarea class="form-control" name="description" v-model="post.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="">Category:</label>
                                <select class="form-control" name="category_id" v-model="post.category_id">
                                    <option v-for="(item, index) in categories" v-bind:key="index"
                                        v-bind:value="item.id">
                                        {{ item.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="text-center pt-5">
                                <button type="submit" class="btn btn-success">Save</button>&nbsp;
                                <router-link :to="{ name: 'posts' }" class="btn btn-light">Cancel</router-link>
                            </div>
                        </form>
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
            post: [],
            errorMsg: ''

        }
    },
    created: function () {
        this.getCategories();
        this.getPost();
        this.getUser();
    },
    methods: {
        getUser(){
            var token =localStorage.getItem('token')
            if(!token){
                this.$router.push('/login');
            }
        },
        getCategories() {
            fetch("http://127.0.01:8000/api/categories", {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.getItem('token')
                    },
                })
                .then((response) => response.json())
                .then((dataResponse) => {
                    console.log(dataResponse.categories)
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    this.categories = dataResponse.categories;
                })
        },
        getPost() {
            fetch("http://127.0.01:8000/api/posts/" + this.$route.params.id, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.getItem('token')
                    },
                })
                .then((response) => response.json())
                .then((dataResponse) => {
                    console.log(this.$route.params.id)
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    console.log(dataResponse)
                    this.post = dataResponse.post
                })
        },
        editPost() {

            console.log(this.post);
            var dataSend = {
                id: this.$route.params.id,
                name: this.post.name,
                description: this.post.description,
                category_id: this.post.category_id
            }

            fetch("http://127.0.01:8000/api/posts/" + this.$route.params.id, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ localStorage.getItem('token')
                },
                body: JSON.stringify(dataSend)
            })
                .then(response => response.json())
                .then((dataResponse => {
                    console.log(dataResponse.messages)
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    if (dataResponse.messages) {
                        this.errorMsg = dataResponse.messages
                    } else {
                        this.$router.push('/posts');
                    }
                }))
        }
    }
}
</script>