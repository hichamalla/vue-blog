import { ref } from "vue"

const useTags = (posts) => {
    
    const tags = ref([])
    const tagSet = new Set()
    posts.forEach(post => 
        post.tags.forEach(tag =>
            tagSet.add(tag)
            )
    );
    // console.log('tagSet',tagSet)
    tags.value= [...tagSet]
    
    return {tags}

}
export default useTags