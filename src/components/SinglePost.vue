<template>
    <div class="post">
        <RouterLink :to="{name:'postDetails',params:{idx:post.id}}">
            <h3> {{post.title}}</h3>
        </RouterLink>
        <!-- <div> {{bodyPostr}}</div> -->
        <div v-if="post.tags.length">
            <span v-for="tag in post.tags" :key="tag">
                <RouterLink :to="{name:'tags', params:{tag:tag}}">
                     #{{tag}}
                </RouterLink>
            </span>
        </div>
    </div>

</template>

<script>
import { computed } from 'vue';


export default {
    name: 'SinglePost',
    props: ['post'],
    setup(props) {
        console.log(props.post.tags)
        const bodyPostr = computed(() => {
            return props.post.body.substring(0, 100) + '...'
        })
        return { bodyPostr }
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