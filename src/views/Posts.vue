<template>
    <section class="posts">
        <PostSub
            :name="data[0].data.author"
            v-if="data"
        />
    </section>
</template>

<script>
import PostSub from '@/components/PostSub.vue'
import axios from 'axios'

export default{
    name: 'Posts',
    data(){
        return{
            type: '',
            id: '',
            data: ''
        }
    },
    components:{
        PostSub
    },
    methods:{
        getData(){
            this.type = this.$route.params.type;
            this.id = this.$route.params.id;
            axios.get(`https://reddit.com/${this.type}/${this.id}.json?limit=100`)
            .then(res=>{
                this.data = res.data.data.children;
                console.log(this.data);
            }).catch(err=>{
                console.log(err);
            });
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