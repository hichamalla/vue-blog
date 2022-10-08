<template>
    <div class="tag-cloud">
        <h3>Tags</h3>
        <!-- <div v-for="tag in tags">
            <RouterLink :to="{name:'tags', params:{tag:tag}}">
                #{{tag}}
            </RouterLink>
        </div> -->
    </div>
</template>

<script>
import useTags from '../composable/useTags'
export default {
    props: ['posts'],
    name: 'tagList',
    setup(props) {
        // console.log('props.tags',props.posts)
        // const { tags } = useTags(props.posts)

        // return { tags }
    }
}

</script>

<style>
    .tag-cloud {
      padding: 10px;
    }
    .tag-cloud h3 {
      border-bottom: 1px solid #eee;
      padding: 16px 8px;
      color: #444;
    }
    .tag-cloud div {
      display: inline-block;
      padding: 10px;
    }
    .tag-cloud a {
      color: #ccc;
      text-decoration: none;
    }
    .tag-cloud a.router-link-active {
      color: #ff8800;
      font-weight: bold;
    }
  </style>