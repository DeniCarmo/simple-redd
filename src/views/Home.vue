<template>
  <div class="home container">
    <div class="row">
      <div class="col-12">
        <Logo/>
      </div>
      <div class="col-12">
        <Search/>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import Logo from '@/components/Logo.vue';

export default {
  name: 'Home',
  components: {
    Search,
    Logo
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/modules/home.scss';
</style>