<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Categories List</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12" style="padding-bottom:20px">
                        <router-link :to="{ name: 'create categories' }" class="btn btn-success">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;New Category
                        </router-link>
                    </div>
                    <div class="col-lg-12">
                        <table class="table table-striped text-left">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th width="30%">Name</th>
                                    <th>Description</th>
                                    <th width="20%" class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="category in categories" :key="category.id">
                                    <td>{{ category.id }}</td>
                                    <td>{{ category.name }}</td>
                                    <td>{{ category.description }}</td>
                                    <td class="text-center">

                                        <router-link :to="{ name: 'edit categories', params: { id: category.id } }"
                                            class="btn btn-primary btn-sm"><i class="fa fa-pencil-square-o"
                                                aria-hidden="true"></i></router-link>&nbsp;
                                        <button class="btn btn-danger btn-sm" v-on:click="deleteCategory(category.id)">
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
            categories: [],
        };
    },

    created: function () {
        this.getCategories();
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
        deleteCategory(id) {
            if (confirm("Are you sure to delete the category?")) {
                fetch("http://127.0.01:8000/api/categories/" + id, {
                    method: "Delete",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.getItem('token')
                    },
                })
                    .then((response) => response.json())
                    .then((dataResponse) => {
                        console.log(dataResponse);
                        if(dataResponse.status){
                        this.$router.push('/login');
                    }
                        window.location.href = 'categories'
                    })
            }
        }
    },
};
</script>