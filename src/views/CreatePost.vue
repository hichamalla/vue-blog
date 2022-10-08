<template>
    <div v-if="err" style="background-color: red;"> 
        {{err}}
    </div>
    <div class="create">
        <form v-on:submit.prevent="submit">

            <label> title</label>
            <input type="text" v-model="title" required>
            <label> body</label>
            <textarea  v-model="body" required></textarea>
            <label> tags (hit entre to create)</label>
            <input v-model="tag" @keydown.enter.prevent="addTag" type="text">
            <div v-if="tags.length>0">
                <span v-for="tagElemen in tags" :key="tagElemen.id" class="pill"> #{{tagElemen}}</span>
            </div>

            <div>
                <button>Create</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import {createNewDocuments} from '../composable/postsHandler';
export default {
    name: "createPost",
    setup() {
        const title = ref("")
        const body = ref("")
        const tag = ref("")
        const tags = ref([])
        const err=ref('')
        const addTag = () => {
            tag.value = tag.value.replace(/\s/g, '')
            if (!tags.value.includes(tag.value)) {

                tags.value.push(tag.value)

            }
            tag.value = ''
        }
        
       
        const submit = () => {
            const newPost={
            title: title.value,
            body: body.value,
            tags: tags.value,
          
        }
        const { id, error:err } = createNewDocuments(newPost)
            // console.log(title.value,body.value,tags.value)
            // console.log(newPost)
            // apiCall()
            // err.value=error.value
            // console.log(posts,error)
        }
        

        return {
            err,
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