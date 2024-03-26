<template>
    <div class="login-page">

        <div class="d-flex flex-column justify-content-center" style="height: 84.9% !important;">
            <div class="container">

                <div class="row d-flex flex-column align-items-center justify-content-start avatar_1">
                    <div class="col-md-3 px-5 px-md-0">
                        <div class="row mb-4">
                            <div class="col-md-12 d-flex justify-content-center align-items-center">
                                <h3 class="ms-2 mb-0">Welcome to <br> to do list app</h3>
                            </div>
                        </div>
                        <form @submit.prevent="login()">
                            <div class="mb-4">
                                <vs-input type="username" id="username" placeholder="username" v-model="username" > 
                                    <template #icon>
                                        <i class='bx bx-user'></i>
                                    </template>
                                </vs-input>
                            </div>
                            <div class="mb-4">
                                <vs-input type="password" id="password" placeholder="password" v-model="password" >
                                    <template #icon>
                                        <i class='bx bxs-lock' ></i>
                                    </template>
                                </vs-input>
                            </div>
                            <div class="d-grid gap-2">
                                <vs-button block type="submit">Login</vs-button>
                                <p>Belum punya akun? <router-link class="nav--link" to="/sign-up">Buat akun</router-link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {AlertUtils} from "@/mixins/AlertUtils"

export default{
    mixins: [AlertUtils],
    data(){
        return{
            username: "",
            password: "",
        }
    },
    computed: {
        ...mapGetters(['processing', 'currentUser', 'loginError'])
    },
    watch: {
        currentUser(value){
            if(value != null){
                this.$router.push({ path: '/welcome' });
            }
        },
        loginError(value){
            if(value.statusCode === 401){
                this.alertDefault('top-center', 'Pemberitahuan!', value.message, 'dark');
            }
        }
    },
    methods: {
        ...mapActions(['sign']),

        login(){
            this.sign({
                username: this.username,
                password: this.password
            })
        }
    }
}
</script>
<style>
.login-page .el-alert__title {
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
}
.login-page .vs-input{
    width: 296px;
}
</style>
<style scoped>
.nav--link{
    color: #0286D4;
    text-decoration: none;
}
.login-page{
    height: 100vh;
    background: #ffffff;
}
h3{
    color: #0286D4;
    font-weight: 700;
}
h4{
    font-weight: bold;
    font-size: 20px;
}
.btn-app_primary{
    background-color: #0286D4;
    color: #ffffff;
    font-size: 16px;
}
.btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
    background-color: #00A0FE;
    color: #ffffff;
    font-size: 16px;
}
.login-page .form-control{
    border: 1px solid #DCDFE6;
    font-size: 14px;
    font-weight: 600;
}

.avatar_1{
    background-image: url("@/assets/img/illustrations/login-avatar-2.png");
    background-repeat: no-repeat;
    background-size: 200px;
    background-position-x: 219px;
    height: 29rem;
}
</style>