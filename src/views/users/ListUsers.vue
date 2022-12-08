<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Users List</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12" style="padding-bottom:20px">
                        <router-link :to="{ name: 'create users' }" class="btn btn-success">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;New User
                        </router-link>
                    </div>
                    <div class="col-lg-12">
                        <table class="table table-striped text-left">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th width="30%">Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email}}</td>
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
            users: [],
        };
    },

    created: function () {
        this.getUsers();
        this.getUser();
    },
    methods: {
        getUser(){
            var token =localStorage.getItem('token')
            if(!token){
                this.$router.push('/login');
            }
        },
        getUsers() {
            fetch("http://localhost:8000/api/users", {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.getItem('token')
                    },
                })
                .then((response) => response.json())
                .then((dataResponse) => {
                    console.log(dataResponse.users)
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    this.users = dataResponse.users;
                })
        }
    },
};
</script>