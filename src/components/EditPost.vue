<template>
    <div v-if="error" style="background-color: red;">
        {{error}}
    </div>
    <div v-if="!isLoading">
        <div class="create">
            <form v-on:submit.prevent="submit">

                <label> title</label>
                <input type="text" v-model="title" required>
                <label> body</label>
                <textarea v-model="body" required></textarea>
                <label> tags (hit entre to create)</label>
                <input v-model="tag" @keydown.enter.prevent="addTag" type="text">
                <div v-if="tags">
                    <span v-for="tagElemen in tags" :key="tagElemen.id" class="pill" @dblclick="tags=tags.filter(selTag=>selTag!=tagElemen)"> #{{tagElemen}}</span>
                </div>

                <div>
                    <button>Create</button>
                </div>
            </form>
        </div>
    </div>
    <div v-else>
        <Spinner></Spinner>
    </div>
</template>

<script>
import { ref } from 'vue';
import { updatePosts } from '../composable/postsHandler';
import Spinner from './spinner.vue';
export default {
    name: "EditPost",
    props:['post'],
    emits: ['updated'],
    components: { Spinner },
    setup(props,{ emit }) {
        const title = ref(props.post.title)
        const body = ref(props.post.body)
        const tag = ref("")
        const tags = ref(props.post.tags)
        const error = ref('')
        const isLoading = ref(false)
        const addTag = () => {
            tag.value = tag.value.replace(/\s/g, '')
            if (!tags.value.includes(tag.value)) {

                tags.value.push(tag.value)

            }
            tag.value = ''
        }



        const submit = () => {
            isLoading.value = true
            const newPost = {
                title: title.value,
                body: body.value,
                tags: tags.value,

            }
            updatePosts(props.post.id,newPost).then(postsApi => {
                console.log('da', postsApi)
                // posts.value = postsApi
                emit('updated',{...newPost,id:props.post.id});
            }
            ).catch(err => {
                console.log('err', err)
                error.value = err
            }
            ).finally(() => {
                isLoading.value = false

                console.log("done")
            })
        }



        return {
            error,
            isLoading,
            title,
            body,
            tag,
            tags,
            addTag,
            submit
        }
    }
}
</script>

<style>
form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
}

input,
textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
}

textarea {
    height: 160px;
}

label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
}

label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
}

button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
}

.pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
}
</style>