<template>
    <div > 
<Header />
<span @click="searchBarClose">
<Nuxt />
<Footer />
</span>

<span v-show="false">
    {{ getSearchBarOpenStatus }}
</span>

    </div>
</template>

<script>
import Header from '~/components/Header/Header.vue'


export default {
    data () {
        return {
           searchStatus : '' 
        }
    },
  computed : {
  getSearchBarOpenStatus () {
      this.searchStatus = this.$store.getters.searchStatus;
      return false;
  }
  },
    methods : {
        searchBarClose () {
        if (this.searchStatus === false) {
            return;
        }
           this.$store.dispatch('searchStatus', false);
        }
    }
}
</script>