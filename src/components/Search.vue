<template>
    <form class="search">
        <label for="searchSelect" class="search-label">Select the type of reddit:</label>
        <select name="searchSelect" id="searchSelect" class="search-select" v-model="selectInput">
            <option value="">Select</option>
            <option value="r">/r</option>
            <option value="user">/u</option>
        </select>
        <label for="searchSelect" class="search-label">Select the type of reddit:</label>
        <input type="text" name="searchInput" id="searchInput" class="search-input" placeholder="Search..." v-model="searchInput">
        <button class="search-submit" @click.prevent="querySearch">GO!</button>
    </form>
</template>

<script>
export default {
    name: 'Search',
    data(){
        return{
            selectInput: '',
            searchInput: ''
        }
    },
    methods:{
        querySearch(){
            if(this.selectInput && this.searchInput) this.$router.push({name: 'Posts', params: {type: this.selectInput, id: this.searchInput}});
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../sass/modules/search';
</style>