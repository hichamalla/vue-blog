<template>
 <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>

    import {fetchDocumentData} from '../composable/postsHandler';
export default {
    name: "DetailsPost",
    props: ['idx'], 
    setup(props) {
    
      const {post,error} = fetchDocumentData(props.idx)
        console.log("home",post,error)
        return { post,error };
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