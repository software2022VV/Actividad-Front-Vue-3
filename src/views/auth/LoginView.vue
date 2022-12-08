<template>
    <div class="container">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4">
                </div>
                <div class="col-lg-4">
                    <div class="card" style="margin-top:20px">
                        <div class="card-header text-center">
                            <h6>Welcome</h6>
                        </div>
                        <div class="card-body">
                            <form v-on:submit.prevent="login">
                                <div class="form-group">
                                    <label for="">Email:</label>
                                    <input type="email" v-model="user.email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Pasword:</label>
                                    <input type="password" class="form-control" v-model="user.password">
                                </div>
                                <div class="text-center pt-2">
                                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            user:[],
            errorMsg: ''
        }
    },methods: {
        login() {
            console.log(this.user);
            var dataSend = {
                email: this.user.email,
                password: this.user.password
            }

            fetch("http://127.0.01:8000/api/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            })
                .then(response => response.json())
                .then((dataResponse => {
                        localStorage.setItem('token',dataResponse.token)
                        this.$router.push('/');
                    
                }))
        }
    }
}
</script>