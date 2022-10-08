<template>
    <div v-if="isDeleted2">DELETED</div>
    <div v-if="error2">{{error2}}</div>
    <div class="post">
        <RouterLink :to="{name:'postDetails',params:{idx:post.id}}">
            <h3> {{post.id}}</h3> 
        </RouterLink>
        <button @click.prevent="handleDelete(post.id)" >remove elemnt</button>
        <div> {{bodyPostr}}</div>
        <div v-if="post.tags.length">
            <span v-for="tag in post.tags" :key="tag">
                <!-- <RouterLink :to="{name:'tags', params:{tag:tag}}">
                     #{{tag}}
                </RouterLink> -->
            </span>
        </div>
    </div>

</template>

<script>

import { computed, ref } from 'vue';
import {removeDocumentData} from '../composable/postsHandler';

export default {
    name: 'SinglePost',
    props: ['post'],
    emits: ['delete'],
    setup(props,{ emit }) {
        const isDeleted2=ref('')
        const error2=ref()
        // console.log(props.post.tags)
        // let isDeletede=ref(false)
        // let id=props.post.id
        // console.log('props.post.id',props.post.id)
        const bodyPostr = computed(() => {
            return props.post.body.substring(0, 100) + '...'
        })
        function handleDelete(id){
            // event.preventDefault()
            // console.log(event)
            console.log(id)
            const {isDeleted,error} = removeDocumentData(id)
        console.log("homie",isDeleted,error)
        // isDeleted2.value=isDeleted.value
        // error2=error

            emit('delete',id);
            
        } 
      
        return { bodyPostr ,handleDelete,isDeleted2,error2}
    },

}

</script>

<style>
    .post {
      margin: 0 40px 30px;
      padding-bottom: 30px;
      border-bottom: 1px dashed #e7e7e7;
    }
    .post h3 {
      display: inline-block;
      position: relative;
      font-size: 26px;
      color: white;
      margin-bottom: 10px;
      max-width: 400px;
    }
    .post h3::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background: #ff8800;
      position: absolute;
      z-index: -1;
      padding-right: 40px;
      left: -30px;
      transform: rotateZ(-1deg);
    }
  </style>