<template>
    <div class="post col-12">
        <h1 class="post-subName">{{ subName }}</h1>

        <div class="post-container" v-for="(post, i) in subData" :key="i">
            <div class="post-wrapper" v-if="post.kind == 't3'">
                <b>{{ i }}</b>
                <div class="post-header">
                    <span class="post-author">
                        Posted on: 
                        <a class="post-author-link" :href="redUrl + post.data.subreddit_name_prefixed">{{ post.data.subreddit_name_prefixed }}</a>
                        by:
                        <a class="post-author-link" :href="redUrl + '/user/' + post.data.author">{{ post.data.author}}</a>
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
                    <a :href="redUrl + post.data.permalink" target="_blank" class="post-content-link" v-if="/(jpg|jpeg|png|webp)$/i.test(post.data.url) && !post.data.media">
                        <img :src="post.data.url" :alt="post.data.post_hint" :title="post.data.post_hint" class="post-content-img">
                    </a>

                    <div class="post-content-gallery" v-if="post.data.is_gallery">
                        <template v-for="(pic, i) in post.data.media_metadata">
                            <a :href="pic.s.u.replace('preview', 'i')" target="_blank" :key="i" class="post-content-link">
                                <img :src="pic.s.u.replace('preview', 'i')" :alt="pic.m" class="post-content-img">
                            </a>
                        </template>
                    </div>

                    <video class="post-content-video" v-if="post.data.is_video" controls>
                        <source :src="post.data.media.reddit_video.fallback_url" type="video/mp4">
                    </video>
                </div>
                <div class="post-title">{{ post.data.title }}</div>
                <p class="post-subtitle">{{ post.data.selftext }}</p>
                <a :href="post.data.url" class="post-title-link" v-if="post.data.url != '' && post.data.url != null">{{ post.data.url | truncateURL }}</a>
                <a :href="redUrl + post.data.permalink" class="post-permalink">See on Reddit</a>
            </div>

            <div class="post-wrapper" v-if="post.kind == 't1'">
                <b>{{ i }}</b>
                <div class="post-header">
                    <span class="post-author">
                        Posted on: 
                        <a class="post-author-link" :href="redUrl + post.data.subreddit_name_prefixed">{{ post.data.subreddit_name_prefixed }}</a>
                        by:
                        <a class="post-author-link" :href="redUrl + '/user/' + post.data.author">{{ post.data.author}}</a>
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
                    <a :href="redUrl + post.data.permalink" target="_blank" class="post-content-link" v-if="/(jpg|jpeg|png|webp)$/i.test(post.data.link_url) && !post.data.is_gallery">
                        <img :src="post.data.link_url" :alt="post.data.post_hint" :title="post.data.post_hint" class="post-content-img">
                    </a>

                    <div class="post-content-gallery" v-if="post.data.is_gallery">
                        <template v-for="(pic, i) in post.data.media_metadata">
                            <a :href="redUrl + post.data.permalink" target="_blank" :key="i" class="post-content-link">
                                <img :src="pic.s.u" :alt="pic.m" class="post-content-img">
                            </a>
                        </template>
                    </div>

                    <video class="post-content-video" v-if="/(gifv)$/i.test(post.data.link_url)" controls>
                        <source :src="post.data.link_url.replace('.gifv', '.mp4')" type="video/mp4">
                    </video>
                </div>
                <div class="post-title">{{ post.data.link_title }}</div>
                <p class="post-subtitle">{{ post.data.selftext }}</p>
                <a :href="post.data.url" class="post-title-link" v-if="post.data.url != '' && post.data.url != null">{{ post.data.url }}</a>
                <a :href="redUrl + post.data.permalink" class="post-permalink">See on Reddit</a>
            </div>

            <div class="post-wrapper" v-if="post.kind != 't1' && post.kind != 't3'">
                <h1>{{ post.kind }}!!!!!!!!!</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'PostSub',
    data(){
        return{
            month: '',
            day: '',
            year: '',
            redUrl: 'https://reddit.com'
        }
    },
    props:['subName', 'subData'],
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
    }
}
</script>


<style lang="scss" scoped>
@import '../sass/modules/post-sub.scss';
</style>