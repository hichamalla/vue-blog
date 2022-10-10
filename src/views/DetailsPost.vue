<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="!isLoading" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <span>last updated at {{post.UpdateddAt.toDate().toLocaleDateString()}}</span>
    <button @click.prevent="handleDelete(post.id)" >remove elemnt</button>
    <button @click.prevent="handleEdit(post.id)" >edit elemnt</button>
  </div>
  <div v-else>
    <Spinner></Spinner>
  </div>
  
  <div v-if="isEditing">
  <edit-post :post="post" @updated="handleUpdate"></edit-post>
</div>
</template>

<script>

import { ref } from 'vue';
import { fetchPostData } from '../composable/postsHandler';
import { updatePosts } from '../composable/postsHandler';
import EditPost  from '../components/EditPost.vue';
import Spinner from '../components/spinner.vue';
export default {
  name: "DetailsPost",
  props: ["idx"],
  components: { Spinner ,EditPost},
  setup(props) {
    const post = ref();
    const error = ref();
    const isLoading = ref(true);
    const isEditing =ref(false)

    fetchPostData(props.idx)
      .then(response => post.value = response).catch(err => {
        console.log("err", err);
        error.value = err;
      }).finally(() => isLoading.value = false);
    
      const handleDelete=(id)=>{
        isLoading.value = true
        updatePosts(id).then(response =>console.log(response)).catch(err => {
        console.log("err", err);
        error.value = err;
      }).finally(() => isLoading.value = false);
      }
      const handleEdit=(post)=>{
        isEditing.value = !isEditing.value
       
       }
       const handleUpdate=(body)=>{
        console.log('body',body)
        post.value=body
        isEditing.value = false
       }
    console.log("home", post, error);
    return { post, error, isLoading,isEditing,handleDelete,handleEdit,handleUpdate};
  }
 
}

</script>


<style scoped>
.tags a {
  margin-right: 10px;
}

.post {
  max-width: 1200px;
  margin: 0 auto;
}

.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}

.pre {
  white-space: pre-wrap;
}
</style>