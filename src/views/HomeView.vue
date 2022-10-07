<template>
    <div class="home">
        <div v-if="error">{{error}}</div>
        <div v-if="posts.length">
            <ListPosts :posts="posts"></ListPosts>
            <tagList :posts="posts"></tagList>
        </div>
        <div v-else>
            <Spinner></Spinner>
        </div>
    </div>
</template>

<script>


import ListPosts from '../components/ListPosts.vue';
import load from '../composable/api/getDataFirebase';


import Spinner from '../components/spinner.vue';
import tagList from '../components/tagList.vue';

export default {
    name: "Home",
    components: { ListPosts, Spinner,tagList },
    setup() {
        
        const {data:posts,error,apiCall }=   load('posts')
        apiCall()
        // console.log("home",{posts,error})
        return { posts,error };
    },
    mounted(){
        console.log("home")
    }
}
</script>

<style>
    .home {
      max-width: 1200px;
      margin: 0 auto;
      padding: 10px;
    }
    .layout {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 20px;
    }
  </style>