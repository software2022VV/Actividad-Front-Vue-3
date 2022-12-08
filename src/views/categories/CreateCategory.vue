<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>New Category</h6>
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
                        <form v-on:submit.prevent="addCategory">
                            <div class="form-group">
                                <label for="">Name:</label>
                                <input type="text" class="form-control" name="name" v-model="category.name">
                            </div>
                            <div class="form-group">
                                <label for="">Description:</label>
                                <textarea class="form-control" name="description"
                                    v-model="category.description"></textarea>
                            </div>
                            <div class="text-center pt-5">
                                <button type="submit" class="btn btn-success">Save</button>&nbsp;
                                <router-link :to="{name: 'categories'}" class="btn btn-light">Cancel</router-link>
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
            category: [],
            errorMsg: '',
            user: null

        }
    },
    created: function () {
        this.getUser();
    },
    methods: {
        getUser(){
            var token =localStorage.getItem('token')
            if(!token){
                this.$router.push('/login');
            }
        },
        addCategory() {
            console.log(this.category);
            var dataSend = {
                name: this.category.name,
                description: this.category.description
            }
            fetch("http://127.0.01:8000/api/categories", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ localStorage.getItem('token')
                },
                body: JSON.stringify(dataSend)
            })
                .then(response => response.json())
                .then((dataResponse => {
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    if (dataResponse.messages) {
                        this.errorMsg = dataResponse.messages
                    } else {
                        this.$router.push('/categories');
                    }
                }))

        }
    }
}
</script>