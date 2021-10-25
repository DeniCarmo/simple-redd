<template>
    <section class="posts container">
        <div class="row">
            <div class="col-12">
                <Logo/>
            </div>
            <PostSub
                :subName="data[0].data.author"
                v-if="data && $route.params.type == 'r'"
                :subData="data"
            />

            <PostUser
                :userName="data[0].data.author"
                v-if="data && $route.params.type == 'user'"
                :userData="data"
            />
        </div>
    </section>
</template>

<script>
import Logo from '@/components/Logo.vue'
import PostSub from '@/components/PostSub.vue'
import PostUser from '@/components/PostUser.vue'
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
        Logo,
        PostSub,
        PostUser
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