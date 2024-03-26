<template>
    <li class="tasks__item">
        <div class="tasks__item__toggle d-flex justify-content-between align-items-center" :class="{'tasks__item__toggle--completed': listItemTask.itemCompletionStatus}" >{{listItemTask.name}}

            <div class="d-flex justify-content-end align-items-center">
                <vs-button shadow flat success :active="active_action == 0" v-if="!listItemTask.itemCompletionStatus" @click="$emit('complete:item')">
                    <i class='bx bx-check'></i> Complete
                </vs-button>
                <vs-button shadow flat danger :active="active_action == 0" @click="$emit('remove:item')">
                    <i class='bx bxs-trash' ></i>
                </vs-button>
            </div>
        </div>
    </li>
</template>

<script>
import { saveItemChecklist } from "@/service/checklist/checklist.service.js"
import {AlertUtils} from "@/mixins/AlertUtils"

export default{
    props: ['listItemTask'],
    mixins: [AlertUtils],
    data(){
        return{
            active_action: 0,
            newTask: '',
            active_add: 0,
            renamed_task: ''
        }
    },
    computed: {
    
    },
    mounted(){
    },
    watch: {
        listItemTask(){
            this.getList()
        }
    },
    methods: {
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
box-shadow: 0px .25rem 1rem rgba(black, .25);
}

.tasks__list{
clear: both;
}

.tasks__item{
margin-bottomL: .5em;
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