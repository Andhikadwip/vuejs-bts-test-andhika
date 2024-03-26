<template>
    <li class="tasks__item">
        <div class="tasks__item__toggle d-flex justify-content-between align-items-center" :class="{'tasks__item__toggle--completed': listItemTask.itemCompletionStatus}" >
            <div class="d-flex" v-if="!listItemTask.itemCompletionStatus">
                <vs-input v-model="listItemTask.name" placeholder="Rename item to do"/>
                <vs-button shadow flat success :active="active_action == 0" v-if="!listItemTask.itemCompletionStatus" @click="$emit('rename:item', listItemTask.name)">
                    <i class='bx bxs-edit-alt'></i> Rename
                </vs-button>
            </div>
            <span v-else>
                {{ listItemTask.name }}
            </span>
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
export default{
    props: ['listItemTask'],
    data(){
        return{
            active_action: 0,
        }
    },
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

.tasks__item__toggle--completed{
    text-decoration: line-through;
    background-color: rgba(116, 235, 52, .15);
    border-color: rgba(116, 235, 52, .2);
}


.tasks__item__toggle--completed:hover{
    background-color: rgba(116, 235, 52, .25);
    border-color: rgba(116, 235, 52, .3);
}
</style>