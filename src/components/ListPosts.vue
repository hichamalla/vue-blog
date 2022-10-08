<template>
    <div v-for="post in postsData" :key="post.id">
        
        <single-post :post="post" @delete="handleDelte"></single-post>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import SinglePost from '../components/SinglePost.vue';


export default {
    name: "ListPosts",
    props: ['posts'],
    components: { SinglePost },
    setup(props){
        let isDeletede=ref('')
        let postsData=ref(props.posts)
        console.log(postsData,"reactive")
        const handleDelte=(id)=>{
        
            let p=postsData.value.filter(post=>post.id!=id)
            postsData.value=p
            console.log(postsData,"reactive2")
        }
        return {handleDelte,isDeletede,postsData}
    }
}
</script>