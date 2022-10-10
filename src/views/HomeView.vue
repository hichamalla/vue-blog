<template>
    <div class="home">
        <div v-if="error">{{error}}</div>
        <!-- <div v-if="isLoading">posts.length</div> -->
        <div v-if="!isLoading">
            <ListPosts :posts="posts"></ListPosts>
            <tagList :posts="posts"></tagList>
        </div>
        <div v-else>
            <Spinner></Spinner>
        </div>
    </div> -
</template>

<script>
import { ref } from 'vue';

import { getPosts } from '../composable/postsHandler';

import ListPosts from '../components/ListPosts.vue';
import Spinner from '../components/spinner.vue';
import tagList from '../components/tagList.vue';


export default {
    name: "Home",
    components: { ListPosts, Spinner, tagList },
    setup() {
        const posts = ref()
        const error = ref()
        const isLoading = ref(true)

        getPosts()
            .then(postsApi => {
                console.log('da', postsApi)
                posts.value = postsApi
            }
            ).catch(err => {
                console.log('err', err)
                error.value = err
            }
            ).finally(() => isLoading.value = false)
        console.log('data', posts.value)
        return {
            posts,
            error,
            isLoading
        }
    },
    mounted() {
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