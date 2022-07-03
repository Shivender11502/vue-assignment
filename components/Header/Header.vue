<template>
    <div class="container pt-3 h-auto header-custom-class"> 
    <div class="h-12 grid grid-cols-12">
    <div class="col-start-2">
       <img src="~/assets/images/background1.jpg" />
       
    </div>
    <div class="pt-1 col-start-6 flex justify-center" style="color:white;font-size:15px;">
       <nuxt-link to="/Dashboard">
       <span v-bind:class="selectedPage === 'Dashboard' ? 'custom-class1': 'custom-class2'"> Page 1 </span>
       </nuxt-link>
    </div>
     <div class="pt-1 col-start-7" style="color:white;font-size:15px;">
  <nuxt-link to="/Page2">
        <span v-bind:class="selectedPage === 'Page2' ? 'custom-class1': 'custom-class2'" > Page 2 </span>
       </nuxt-link>
     </div>
     <div class="pt-1 col-start-10" style="color:white;font-size:15px;">
      <div class="grid grid-cols-4">
          
       <div v-if="!searchStatus" @click="toggleSearchBar" class="col-start-4 grid justify-end" style="cursor: pointer;">
           <div class="input-icons">
             <i>&#128270; </i>          
            <input class="input-field" type="text">
           
        </div>
       </div>
       <div v-else class="col-start-1" >
           <div class="input-icons">
             <i  @click="search">&#128270; </i>          
        <input type="text" class="input-field2" @keyup="search" v-model="searchBarText" placeholder="Search" style="color: black;" />
       </div>
       </div>
      </div>
     </div>
     <span v-show="false">
     {{ changePageValue }}
     {{ getSearchBarOpenStatus }}
     </span>
    </div>
    </div>
</template>

<script>
import index from '~/pages/index.vue';

export default {
  components: { index },
    data () {
        return {
       selectedPage : '',
       closeSearchBar: false,
       searchBarText: '',
       searchStatus: false
        }
    },
    computed: {
    changePageValue () {
      
        this.selectedPage = this.$store.getters.selectedPage;
      
        return this.selectedPage;
        },
        getSearchBarOpenStatus () {
            this.searchBarText = '';
      this.searchStatus = this.$store.getters.searchStatus;

      return false;
    }
    },
    methods : {
        toggleSearchBar () {
            this.closeSearchBar = true;
            this.$store.dispatch('searchStatus', true);
        },
        search () {
            console.log(this.searchBarText);
        }
    }
}
</script>

<style scoped>
.header-custom-class {
    background-color: black;
}

.custom-class1 {
    text-decoration: underline;
    color: white;
}
.custom-class2 {
    color: #a5a5a5;
}

.custom-class2:hover {
    color: white;
}

 .input-icons i {
    font-size: 16px;
    color: black;
    position: absolute
        }
          
        .input-icons {
            width: 100%;
            margin-bottom: 10px;
            cursor: pointer;
        }
          
        .icon {
            padding: 10px;
            min-width: 40px;
            cursor: pointer;
        }
          
        .input-field {
            width: 100%;
            text-align: center;
            cursor: pointer;
            outline: none;
        }

            .input-field2 {
            text-align: center;
            outline: none;
        }
</style>
