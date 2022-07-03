<template>
    <div >
        
        <div class="mt-2 h-24 grid grid-cols-12 grid-rows-3">
        
        <div class="col-start-2 col-span-10 row-span-3 background-image-display"
         >
        <span class="h-48">
            
            <img class="h-48" :src="backgroundImage" style="width: 100%;" /> 
            
            </span>
        </div>
            <div @click="changeImage" class="col-start-2 grid justify-start">
        <span  style="font-size: 29px;background-color: aliceblue;cursor:pointer;" >&larr; </span>
        </div>
        <div @click="changeImageBackSide" class=" col-start-11 grid justify-end">
        <span style="font-size: 29px;background-color: aliceblue;cursor:pointer;" >&rarr; </span>
        </div>
        </div>
        <div v-for="(item, index) in content" :key="index" class="pt-8" >
 <div v-if="index % 2 === 0" >
     <div class="mt-12 pt-10 grid grid-cols-12">
<div class="col-start-3 col-span-4">
<div class="grid grid-cols-12">
    <div  class="col-start-1 col-span-5" style="font-weight:650;font-size: 25px;">
    {{ item.text }}
    </div>
     <div class="col-start-1 col-span-11" style="font-size: 12px;font-weight: 500;">
   {{ item.description }}
    </div>

</div>
</div>
<div class="col-start-7 col-span-5" style="background-color: #e5e5e5;">

</div>
     </div>
 </div>
 <div v-else>

     <div class="grid grid-cols-12">
<div class="col-start-3 col-span-5" style="background-color: #e5e5e5;">

</div>
<div class="col-start-8 col-span-4">
<div class="grid grid-cols-12" style="text-align: right;">
    <div class="col-start-8 col-span-5" style="font-weight:650;font-size: 25px;">
    {{ item.text }}
    </div>
     <div class="col-start-2 col-span-12" style="font-size: 12px;font-weight: 500;">
   {{ item.description }}
    </div>
</div>
</div>
     </div>
     </div>
 </div>
        </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data () {
        return {
        backgroundImage: require("@/assets/images/background1.jpg"),
        count: 1,
        content : [{
            "text": "Loren ipsum 1",
            "description": " Loren ipsum 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            "text": "Loren ipsum 2",
            "description": " Loren ipsum 2 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }]
        }
    },
    created () {
    this.$store.dispatch('selectedPage', 'Dashboard');
    },
    methods : {
        changeImage () {
            if (this.count === 3) {
               this.backgroundImage = require("@/assets/images/background1.jpg"); 
               this.count = 1;
            }
            else if (this.count === 1) {
            this.backgroundImage = require("@/assets/images/background2.png");
            this.count++;
        }
        else if (this.count === 2) {
            this.backgroundImage = require("@/assets/images/background3.png");
            this.count++;
        }
    },
    changeImageBackSide () {
         if (this.count === 1) {
               this.backgroundImage = require("@/assets/images/background3.png");
               this.count = 3;
            }
            else if (this.count === 3) {
            this.backgroundImage = require("@/assets/images/background2.png");
            this.count--;
        }
        else if (this.count === 2) {
            this.backgroundImage = require("@/assets/images/background1.jpg");
            this.count--;
        }

    }
    }
    
}
</script>

<style scoped>
.background-image-display {
background-image: v-bind('backgroundImage');
color : v-bind(color);
}
</style>
