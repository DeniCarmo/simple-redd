<template>
    <div class="logo-wrapper">
        <h1 class="logo" v-if="$route.name == 'Home'">
            <span class="logo-top">SIMPLE</span>
            <span class="logo-bottom">redd</span>
        </h1>
        <router-link :to="{name: 'Home'}" class="logo">
            <span class="logo-top">SIMPLE</span>
            <span class="logo-bottom">redd</span>
        </router-link>
    </div>
</template>

<script>
export default{
    name: 'Logo',
    data(){
        return{
            
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../sass/modules/logo';
</style>