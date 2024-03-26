<template>
    <div class="main--app">
            <section class="tasks">
                <h1>
                    Daily To Do List
                    <transition name="fade">
                        <small v-if="incomplete">({{ incomplete }})</small>
                    </transition>
                </h1>
                <div class="tasks__new d-flex align-items-center justify-content-end my-3">
                    <vs-input class="input-group-field" v-model="newTask" @keyup.enter="addTask" placeholder="New task" />
                    <vs-button relief :active="active_add == 1" @click="addTask">
                        Add
                    </vs-button>
                </div>

                
                <transition-group name="fade" tag="ul" class="tasks__list p-0">
                    <task-item v-for="task in tasks" @remove="removeTask(task.id)" class="mb-3" :task="task" :key="task.id"
                    ></task-item>
                </transition-group>

                <div class="d-flex justify-content-end">
                    <vs-button relief class="d-flex flex-column align-items-center" danger :active="active_add == 1" @click="logOut">
                        <i class='bx bx-power-off'></i>
                        Keluar
                    </vs-button>
                </div>
            </section>
        </div>
</template>

<script>
import { checklistGetList, saveChecklist, deleteChecklist } from "@/service/checklist/checklist.service.js"
import TaskItem from "@/components/TaskItem.vue";
import {AlertUtils} from "@/mixins/AlertUtils"

import Swal from 'sweetalert2'

export default{
    mixins: [AlertUtils],

    components: {
        TaskItem
    },
    data(){
        return{
            list_data: [],
            newTask: '',
            active_add: 0,
            active_action: 0,
            tasks: []
        }
    },
    computed: {
        incomplete() {
            return this.tasks.filter(this.inProgress).length;
        }
    },
    watch: {
        newTask(){
            this.active_add = 0;
        }
    },
    
    mounted(){
        this.getList();
    },
    methods: {
        logOut(){
            Swal.fire({
                title: "Apakah kamu yakin?",
                text: "ingin keluar dari aplikasi",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Keluar!",
                cancelButtonText: "Tidak!"
                }).then((result) => {
                if (result.isConfirmed) {

                    localStorage.removeItem('users')
                    this.$router.push("/login")

                }
            });
        },
        addTask() {
            if (this.newTask) {
                // this.tasks.push({
                //     title: this.newTask,
                //     completed: false
                // });

                let payload = {
                    name: this.newTask
                }

                saveChecklist(payload).then((res) =>{
                    if(res.data.statusCode){
                        this.getList();
                        this.newTask = '';
                        this.alertDefault('top-center', 'Berhasil!', "To do Berhasil Di save!", 'success');
                    }
                }).catch(err=>{
                    console.log(err)
                    this.alertDefault('top-center', 'Error!', "To do Gagal Di save!", 'danger');
                })
            }
            this.active_add = 1;
        },
        completeTask(idx) {
            this.task[idx].checklistCompletionStatus = !this.task[idx].checklistCompletionStatus
        },
        removeTask(id) {

            Swal.fire({
                title: "Apakah kamu yakin?",
                text: "akan menghapus to do ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus!",
                cancelButtonText: "Tidak, batalkan!"
                }).then((result) => {
                if (result.isConfirmed) {

                    deleteChecklist(id).then((res)=>{

                        if(res.data.statusCode === 2300){
                            this.alertDefault('top-center', 'Berhasil!', "To do Berhasil Di hapus!", 'success');
                            this.getList();
                        }

                    }).catch(err=>{
                        if(err.response.status == 500){
                            this.alertDefault('top-center', 'Error!', "Internal Server Error!", 'danger');
                        }else{

                            this.alertDefault('top-center', 'Error!', "To do Gagal Di hapus!", 'danger');
                        }
                    })

                }
            });
        },
        getList(){
            checklistGetList().then((res)=>{
                if(res.data.statusCode == 2100){
                    this.tasks = res.data.data;
                }
            
            }).catch((err) =>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
 
.fade-enter-active, .fade-leave-active{

    transition: opacity .5s;
}

.fade-enter, .fade-leave-active{

    opacity: 0;
}

.tasks{
    width: 100%;
    max-width: 45rem;
    padding: 1em;
    margin: 1em auto;
    overflow: auto;
    background-color: white;
    box-shadow: 0px .25rem 1rem rgba(0, 0, 0, .25);
    border-radius: 5px;
    margin-top: 5rem;
}

.tasks__list{
    clear: both;
    list-style: none;
}

.tasks__item{
    margin-bottom: .5em;
    position: relative;
}

.tasks__item__toggle{
    cursor: pointer;
    width: 100%;
    text-align: left;
    padding: .85em 2.25em .85em 1em;
    background-color: red;
    border: 1px solid rgba(0, 0, 0, .1);
}
  

.tasks__item__toggle:hover{
    background-color: rgba(255, 71, 87, .1);
    border-color: rgba(0, 0, 0, .15);
}

.tasks__item__toggle--completed{
    text-decoration: line-through;
    background-color: rgba(116, 235, 52, .15);
    border-color: rgba(116, 235, 52, .2);
}
  

.tasks__item__toggle--completed:hover{
    background-color: rgba(116, 235, 52, .25);
    border-color: rgba(116, 235, 52, .3);
}
  

.tasks__item__remove{
    position: absolute;
    height: 100%;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
  
.tasks__item__remove i{
    vertical-align: middle;
}
</style>