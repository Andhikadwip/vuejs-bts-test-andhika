<template>
    <div class="login-page">

        <div class="d-flex flex-column justify-content-center" style="height: 84.9% !important;">
            <div class="container">

                <div class="row d-flex flex-column align-items-center justify-content-start avatar_1">
                    <div class="col-md-3 px-5 px-md-0">
                        <div class="row mb-4">
                            <div class="col-md-12 d-flex justify-content-center align-items-center">
                                <h3 class="ms-2 mb-0 text-nowrap">Welcome, and good luck!</h3>
                            </div>
                        </div>
                        <form @submit.prevent="createAccount()">
                            <div class="mb-4">
                                <vs-input type="email" id="email" placeholder="email" v-model="email" > 
                                    <template #icon>
                                        <i class='bx bxs-envelope'></i>
                                    </template>
                                </vs-input>
                            </div>
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
                            <div class="mb-4">
                                <vs-input type="password" id="password" placeholder="confirm password" v-model="confirm_password" >
                                    <template #icon>
                                        <i class='bx bxs-lock' ></i>
                                    </template>
                                </vs-input>
                            </div>
                            <div class="d-grid gap-2">
                                <vs-button block type="submit" :disabled="processing">Buat Akun</vs-button>
                                <p>Sudah punya akun? <router-link class="nav--link" to="/login">Masuk</router-link></p>
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
            confirm_password: "",
            email: "",
            password: "",
            listError: [],
        }
    },
    computed: {
        ...mapGetters(['processing', 'registerError'])
    },
    watch: {
        registerError(value){
            if(value.statusCode == 2000){
                this.alertDefault('top-center', 'Register Berhasil!', "Halaman akan di arahkan ke login dalam 3 detik.", 'dark');
                setTimeout(() => {
                    this.$router.push("/login")
                }, 3000);
            }else{
                this.alertDefault('top-center', 'Pemberitahuan!', value.errorMessage, 'dark');
            }
        }
    },
    methods: {
        ...mapActions(['signUp']),

        createAccount(){

            if(this.password != this.confirm_password){
                this.alertDefault('top-center', 'Pemberitahuan!', "Harap periksa kembali password dan konfirmasi password!", 'dark');
            }else{
                this.signUp({
                    username: this.username,
                    email: this.email,
                    password: this.confirm_password
                })
            }

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
    background-image: url("@/assets/img/illustrations/login-avatar.png");
    background-repeat: no-repeat;
    background-size: 200px;
    background-position-x: 738px;
    background-position-y: 134px;
    height: 29rem;
}
</style>