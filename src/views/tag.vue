<template>
    {{tag}}
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
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import loadData from '../composable/api/GetData';

import ListPosts from '../components/ListPosts.vue';
import Spinner from '../components/spinner.vue';
export default {
    name: 'tags',
    components: { ListPosts, Spinner },
    // props: ['tag'],
    setup() {
        const router = useRoute()
        let tag = router.params.tag

        const { data: posts, error, apiCall } = loadData('posts')
        apiCall()
        // console.log(posts)
        const resumedData = computed(() => {
            console.log(posts.value)
            // let postdata =  
            let output = []
            output=posts.value.filter(eachVal => {
                // console.log('eachVal',eachVal)
                    let opt = eachVal.tags.filter(value=>value===tag).length>0
                    let hik=eachVal.tags.filter(value=>value===tag)
                    console.log('hik',opt)
                    //     ({tag} ) => tag.some(({tag})==router.params.tag)
                    //         // .some(({ grade }) => grade === 'A')
                    //         );
                    return opt;
                })
                
            //     postdata.filter(post => {
            //     // console.log(post.tags)
            //     // post.tags.include(router.params.tag)

            //     let map = Object.keys(post.tags).map((key) => post.tags[key]);
            //     // console.log('map',map,)
            //     let data = map.includes(router.params.tag);
            //     console.log('data', data)

             
            //     return 0;
            //     // filter(tag=>{
            //     //     console.log(tag,tag===router.params.tag);
            //     //     return tag===router.params.tag
            //     // }).length
            // })
            console.log("postdata", output)
            return output || []
        })
        if (!resumedData.length) {
            error.value = 'no Data Found'
        }
        console.log('resumedData', resumedData,resumedData.length)
        return { tag,posts, resumedData, error }
    }
}
</script>

