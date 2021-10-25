<template>
    <div class="post col-12">
        <h1 class="post-username">{{ userName }}</h1>

        <div class="post-container" v-for="(post, i) in userData" :key="i">
            <div class="post-wrapper" v-if="post.kind == 't3'">
                <div class="post-header">
                    <span class="post-author">
                        Posted by: 
                        <a class="post-author-link" :href="redUrl + post.data.subreddit_name_prefixed">{{ post.data.subreddit_name_prefixed }}</a>
                    </span>
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
                    <a :href="redUrl + post.data.permalink" target="_blank" class="post-content-link" v-if="/(jpg|jpeg|png|webp)$/i.test(post.data.url)">
                        <img :src="post.data.url" :alt="post.data.post_hint" :title="post.data.post_hint" class="post-content-img">
                    </a>

                    <video class="post-content-video" v-if="/(gifv)$/i.test(post.data.url)" controls>
                        <source :src="post.data.preview.reddit_video_preview.fallback_url" type="video/mp4">
                    </video>

                    <a :href="post.data.url" class="post-content-link-text" v-if="!/(jpg|jpeg|png|webp)$/i.test(post.data.url) && !/(gifv)$/i.test(post.data.url)" target="_blank">{{ post.data.title }}</a>
                </div>
                <div class="post-title" v-if="/(jpg|jpeg|png|webp)$/i.test(post.data.url) || /(gifv)$/i.test(post.data.url)">{{ post.data.title }}</div>
                <a :href="redUrl + post.data.permalink" class="post-permalink">See on Reddit</a>
            </div>

            <div class="post-wrapper" v-if="post.kind == 't1'">
                <div class="post-header">
                    <span class="post-author">
                        Posted by: 
                        <a class="post-author-link" :href="redUrl + post.data.subreddit_name_prefixed">{{ post.data.subreddit_name_prefixed }}</a>
                    </span>
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
                    <a :href="'https:reddit.com' + post.data.permalink" target="_blank" class="post-content-link" v-if="/(jpg|jpeg|png|webp)$/i.test(post.data.link_url)">
                        <img :src="post.data.link_url" :alt="post.data.post_hint" :title="post.data.post_hint" class="post-content-img">
                    </a>

                    <video class="post-content-video" v-if="/(gifv)$/i.test(post.data.link_url)" controls>
                        <source :src="post.data.link_url.replace('.gifv', '.mp4')" type="video/mp4">
                    </video>

                    <a :href="post.data.url" class="post-content-link" v-if="!/(jpg|jpeg|png|webp)$/i.test(post.data.url) && !/(gifv)$/i.test(post.data.url)" target="_blank">{{ post.data.title }}</a>
                </div>
                <div class="post-title">{{ post.data.link_title }}</div>
                <a :href="post.data.body" class="post-title-link" target="_blank" v-if="testURL(post.data.body)">{{ post.data.body }}</a>
                <p class="post-subtitle" v-else>{{ post.data.body }}</p>
                <a :href="redUrl + post.data.permalink" class="post-permalink">See on Reddit</a>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'PostUser',
    data(){
        return{
            month: '',
            day: '',
            year: '',
            redUrl: 'https://reddit.com'
        }
    },
    methods:{
        testURL(url) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(url);
        }
    },
    props:['userName', 'userData']
}
</script>

<style lang="scss" scoped>
@import '../sass/modules/post-user.scss';
</style>