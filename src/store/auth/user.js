import { signIn, signUp } from "@/service/auth/auth.service";

export default{
    state: {
        loginError: null,
        registerError: null,
        currentUser: null,
        processing: false
    },
    getters: {
        currentUser: state => state.currentUser,
        loginError: state => state.loginError,
        registerError: state => state.registerError,
        processing: state => state.processing
    },
    mutations: {
        setUsers(state, payload){
            state.currentUser = payload;
            state.processing = false
            state.loginError = null
        },
        setError(state, payload){
            state.loginError = payload;
            state.processing = false
            state.currentUser = null;
        },
        setRegisterError(state, payload){
            state.registerError = payload;
            state.processing = false
            state.currentUser = null;
        }
    },
    actions: {
        sign({ commit }, payload){

            let data = {
                username: payload.username,
                password: payload.password
            }

            signIn(data).then((response)=>{
                console.log(response)
                if(response.data.statusCode === 2110){
                    localStorage.setItem("users", JSON.stringify(response.data.data))
                    commit('setUsers', response.data)
                }else{
                    commit('setError', response.data)
                }
            }).catch((error)=>{
                commit('setError', error.response.data)
            })
        },
        signUp({ commit }, payload){

            let data = {
                email: payload.email,
                username: payload.username,
                password: payload.password
            }

            signUp(data).then((response)=>{
                commit('setRegisterError', response.data)
            }).catch((error)=>{
                console.log(error);
                commit('setRegisterError', error.response.data)
            })
        },
    },
}