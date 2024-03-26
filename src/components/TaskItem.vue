<template>
    <li class="tasks__item">
        <div class="tasks__item__toggle d-flex justify-content-between align-items-center" data-bs-toggle="collapse" :href="'#collapse-task'+task.id" role="button" aria-expanded="false" :aria-controls="'collapse-task'+task.id">{{ task.name }} 
            <vs-button shadow flat danger :active="active_action == 0" @click="$emit('remove')">
                <i class='bx bxs-trash' ></i>
            </vs-button>
        </div>
        <div class="collapse" :id="'collapse-task'+task.id">
            <div class="tasks__new d-flex align-items-center justify-content-start my-3">
                    <vs-input class="input-group-field" v-model="newTask" @keyup.enter="addTask" placeholder="New task" /> <vs-button relief :active="active_add == 1" @click="addTask">
                    Add
                </vs-button>
            </div>
            <div class="card card-body text-start">
                <transition-group name="fade" tag="ul" class="tasks__list p-0">
                    <task-item-child v-for="task in listItemTask" @remove:item="removeTask(task.id)" @complete:item="completeTask(task.id)" class="mb-3" :listItemTask="task" :key="task.id"
                    ></task-item-child>
                </transition-group>
            </div>
        </div>
    </li>
</template>

<script>
import { findChecklistByItem, saveItemChecklist, deleteItemChecklist, changeStatusItemChecklist } from "@/service/checklist/checklist.service.js"
import TaskItemChild from "@/components/TaskItemChild.vue";
import {AlertUtils} from "@/mixins/AlertUtils"
import Swal from 'sweetalert2'

export default{
    props: ['task'],
    mixins: [AlertUtils],
    components: {
        TaskItemChild
    },
    data(){
        return{
            active_action: 0,
            newTask: '',
            active_add: 0,
            listItemTask: []
        }
    },
    computed: {
    
    },
    mounted(){
        this.getList();
    },
    methods: {
        completeTask(id){
            Swal.fire({
                title: "Apakah kamu yakin?",
                text: "ingin mengubah status to do item ini menjadi complete",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya!",
                cancelButtonText: "Tidak, batalkan!"
                }).then((result) => {
                if (result.isConfirmed) {

                    changeStatusItemChecklist(this.task.id, id).then((res)=>{

                        if(res.data.statusCode === 2200){
                            this.alertDefault('top-center', 'Berhasil!', "Status To do Berhasil Di Ubah!", 'success');
                            this.getList()
                        }

                    }).catch(err=>{
                        console.log(err)
                        this.alertDefault('top-center', 'Error!', "Status To do Gagal Di Ubah!", 'error');
                    })

                }
            });
        },
        removeTask(id) {

            Swal.fire({
                title: "Apakah kamu yakin?",
                text: "akan menghapus to do item ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus!",
                cancelButtonText: "Tidak, batalkan!"
                }).then((result) => {
                if (result.isConfirmed) {

                    deleteItemChecklist(this.task.id, id).then((res)=>{

                        if(res.data.statusCode === 2300){
                            this.alertDefault('top-center', 'Berhasil!', "To do Berhasil Di hapus!", 'success');
                            this.getList();
                        }

                    }).catch(err=>{
                        console.log(err)
                        this.alertDefault('top-center', 'Error!', "To do Gagal Di hapus!", 'error');
                    })

                }
            });
        },
        addTask() {
            if (this.newTask) {

                let payload = {
                    itemName: this.newTask
                }

                saveItemChecklist(this.task.id, payload).then((res) =>{
                    if(res.data.statusCode){
                        this.getList();
                        this.newTask = '';
                        this.alertDefault('top-center', 'Berhasil!', "To do item Berhasil Di save!", 'success');
                    }
                }).catch(err=>{
                    console.log(err)
                    this.alertDefault('top-center', 'Error!', "To do item Gagal Di save!", 'danger');
                })
            }
            this.active_add = 1;
        },
        getList(){
            findChecklistByItem(this.task.id).then((res)=>{
                if(res.data.statusCode){
                    this.listItemTask = res.data.data;
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
 


.tasks__item{
    margin-bottom: .5em;
    position: relative;
}

.tasks__item__toggle{
    cursor: pointer;
    width: 100%;
    text-align: left;
    padding: 0.85em 2.25em 0.85em 1em;
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
}


.tasks__item__toggle:hover{
    background-color: rgba(0, 0, 0, .1);
    border-color: rgba(0, 0, 0, 0.15);
}

.tasks__list{
    list-style: none;
}
</style>