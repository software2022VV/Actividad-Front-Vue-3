<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>New User</h6>
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
                            <div class="form-group">
                                <label for="">Confirm password:</label>
                                <input type="password" class="form-control" name="name" v-model="user.password_confirmation">
                            </div>
                            <div class="form-group">
                                <label for="">Role:</label>
                                <select class="form-control" v-model="user.role">
                                    <option value="admin">Administrator</option>
                                    <option value="autor">Author</option>
                                    <option value="lector">Lector</option>
                                </select>
                            </div>
                            <div class="text-center pt-5">
                                <button type="submit" class="btn btn-success">Save</button>&nbsp;
                                <router-link :to="{name: 'users'}" class="btn btn-light">Cancel</router-link>
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

        }
    },
    methods: {
        addUser() {
            console.log(this.user);
            var dataSend = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                password_confirmation: this.user.password_confirmation,
                role: this.user.role
            }


            fetch("http://127.0.01:8000/api/users", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
                .then(response => response.json())
                .then((dataResponse => {
                    console.log(dataResponse)
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    if (dataResponse.messages) {
                        this.errorMsg = dataResponse.messages
                    } else {
                        this.$router.push('/users');
                    }
                }))
        }
    }
}
</script>