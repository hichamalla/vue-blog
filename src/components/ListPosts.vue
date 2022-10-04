<template>
    <div v-for="post in posts">
        <single-post :post="post"></single-post>
    </div>
</template>

<script>
import SinglePost from '../components/SinglePost.vue';
export default {
    name: "ListPosts",
    props: ['posts'],
    components: { SinglePost }
}
</script>