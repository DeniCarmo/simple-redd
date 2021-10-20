<template>
    <div class="post col-12">
        <h1 class="post-username">{{ userName }}</h1>

        <div class="post-container" v-for="(post, i) in userData" :key="i">
            <div class="post-wrapper" v-if="post.kind == 't3'">
                <div class="post-header">
                    <span class="post-author">Posted by: {{ post.data.subreddit_name_prefixed }}</span>
                    <span class="post-flair" v-if="post.data.author_flair_text !== null">{{ post.data.author_flair_text }}</span>
                    <span class="post-awards" v-if="post.data.all_awardings && post.data.all_awardings.length > 0">
                        <div class="post-award" v-for="(award, i) in post.data.all_awardings" :key="i">
                            <img :src="award.icon_url" :alt="award.name" :title="award.name">
                            <span class="post-award-count">{{ award.count }}</span>
                        </div>
                    </span>
                    <div class="post-date">
                        <span class="post-date-year"></span>
                    </div>
                </div>
                <div class="post-content">
                    <a :href="'https:reddit.com' + post.data.permalink" target="_blank" class="post-content-link">
                        <img :src="post.data.url" :alt="post.data.post_hint" :title="post.data.post_hint" class="post-content-img">
                    </a>
                </div>
                <div class="post-title">{{ post.data.title }}</div>
            </div>

            <div class="post-wrapper" v-if="post.kind == 't1'">
                <div class="post-title">{{ post.data.link_title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            name: 'PostUser',
            month: '',
            day: '',
            year: ''
        }
    },
    methods:{

    },
    props:['userName', 'userData']
}
</script>

<style lang="scss" scoped>
@import '../sass/modules/post-user.scss';
</style>