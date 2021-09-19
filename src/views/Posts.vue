<template>
    <section class="posts">
        <Post
            :name="this.data[0].data.subreddit"
        />
    </section>
</template>

<script>
import Post from '@/components/Post.vue'

export default{
    name: 'Posts',
    data(){
        return{
            type: null,
            id: null,
            data: null
        }
    },
    components:{
        Post
    },
    methods:{
        getData(){
            this.type = this.$route.params.type;
            this.id = this.$route.params.id;
            console.log(this.type + ' - ' + this.id);
            fetch(`https://reddit.com/${this.type}/${this.id}.json?limit=100`)
            .then(r=>r.json())
            .then(r=>{
                this.data = r.data.children;
                console.log(this.data);
            })
        }
    },
    created(){
        this.getData();
    }
}
</script>

<style lang="scss" scoped>
    @import '../sass/modules/posts.scss';
</style>