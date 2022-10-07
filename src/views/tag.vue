<template>
    <!-- {{tag}} -->
    <div class="home">
        <div v-if="error">{{error}}</div>
        <div v-if="posts.length">
            <div v-for="da in resumedData">
                <div class="tag">
                    <h4>{{da.title}}</h4>
                    <p>{{da.body}}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <Spinner/>
        </div>
    </div>

</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import getDatafs from '../composable/api/getDataFirebase';

import ListPosts from '../components/ListPosts.vue';
import Spinner from '../components/spinner.vue';
export default {
    name: 'tags',
    components: { ListPosts, Spinner },
    props: ['tag'],
    setup() {
        const router = useRoute()
        const err=ref('')
        let tag = router.params.tag

        const { data: posts, error, apiCall } = getDatafs('posts')
        apiCall()
        // console.log(posts)
        console.log("posts.value",posts.value)
        const resumedData = computed(() => {
            
            // let postdata =  
            let output = []
            output=posts.value.filter(eachVal => {
                // console.log('eachVal',eachVal)
                    let opt = eachVal.tags.includes(tag)

                    return opt;
                })
                
        
            console.log("output S", output)
            return  output 
        })
        
        resumedData.value
        if (error.value!='') {
            console.log("error.value",error.value)
            err.value = error.value
        }
        else if (!resumedData.value.length) {
            console.log('resumedData.length',resumedData.value.length)
            err.value = 'no Data Found'
        }
        console.log('resumedData', resumedData,resumedData.length)
        console.log('err',err.value)
        return { posts, resumedData, error }
    }
}
</script>

