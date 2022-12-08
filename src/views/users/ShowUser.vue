<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Profile</h6>
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
                        <form v-on:submit.prevent="addUser">
                            <div class="form-group">
                                <label for="">Name:</label>
                                <input type="text" class="form-control" name="name" v-model="user.name">
                            </div>
                            <div class="form-group">
                                <label for="">Email:</label>
                                <input type="text" class="form-control" name="name" v-model="user.email">
                            </div>
                            <div class="form-group">
                                <label for="">Password:</label>
                                <input type="password" class="form-control" name="name" v-model="user.password">
                            </div>
                            <div class="text-center pt-5">
                                <button type="submit" class="btn btn-success">Update</button>&nbsp;
                                <router-link :to="{name: 'show user'}" class="btn btn-light">Cancel</router-link>
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
            user: [],
            errorMsg: ''
        };
    },
    created: function () {
        this.getUser();
        this.getUserAuth();
        
    },
    methods: {
        getUser(){
            var token =localStorage.getItem('token')
            if(!token){
                this.$router.push('/login');
            }
        },
        getUserAuth() {
            fetch("http://127.0.01:8000/api/user", {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.getItem('token')
                    },
                })
                .then((response) => response.json())
                .then((dataResponse) => {
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    console.log(dataResponse)
                    this.user=dataResponse.user
                })
        },
    }
}
</script>