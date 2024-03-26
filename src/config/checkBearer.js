export default (to, from, next) =>{
    if(localStorage.getItem('users')){
        let users = JSON.parse(localStorage.getItem('users'))

        if(users.token){
            next();
        }else{
            localStorage.clear();    
            next('/login')
        }
    }else{
        localStorage.clear();
        next('/login')
    }
}