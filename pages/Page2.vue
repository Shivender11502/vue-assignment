<template>
    <div class="container">

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

    

        
<div  class="mt-12 pt-12 grid grid-cols-12">
    <div v-if="!dataProcessing" class="mt-4 col-start-3 col-span-8">
        <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-4" style="font-size: 25px;font-weight: 700;">
        Population
        </div>
        <div  class="col-start-9 flex justify-center">
        <span @click="sortYearAscending" class="tooltip">&#8593;           
  <span class="tooltiptext">Sort By Year Ascending</span>
 </span>
        </div>
        <div class="col-start-10">
        <span @click="sortYearDescending" class="tooltip">&#8595;           
  <span class="tooltiptext">Sort By Year Decending</span>
        </span>
        </div>
        <div class="col-start-11 col-span-2 pt-2">
         <select @change="filterByYear" v-model="selectYear"
                class="w-full h-6 rounded custom-dropdown-box"
                style="cursor: pointer; font-size: 13px;background-color: #e5e5e5;border: none;">
                <option value="" disabled selected hidden>Filter Year</option>
                <option v-for="(item, index) in year" :key="index"> {{ item }}</option>
              </select>
        </div>
        </div>
    </div>
    <div class="mt-4 col-start-3 col-span-8">
 <table class="table-fixed" style="width: 100%;">
  <tbody v-for="(item, index) in records" :key="index" v-bind:class="index % 2 === 0 ? 'custom-background1' : 'custom-background2'">
    <tr>
      <td>
          <div class="grid grid-cols-12">
        <div class="col-start-1  col-span-10" style="font-weight: 700;font-size: 18px;">
             {{ item.Year }} 
        </div>
          <div class="col-start-12  col-span-2 text-2xl">
          <span @click="toggle (index)"   style="text-align: right;cursor: pointer;" >
             <span v-if="selectedIndex !== index">   +
             </span> 
             <span v-else> 
              -
             </span>
              </span>
          </div>
          </div>
      </td>
    </tr>
    <tr v-if="selectedIndex === index"> 
        <td>
            <hr>
        <div class="grid grid-cols-12">
        <div class="col-start-1  col-span-4">
             <div class="grid grid-cols-4">
                 <div class="col-start-1  col-span-4">
          <span class="sub-table-heading"> Country </span>
                 </div>
                 <div class="col-start-1  col-span-4">
          <span class="sub-table-field"> {{ item.Nation}} </span>
                 </div>
             </div>
        </div>
        <div class="col-start-5  col-span-4">
          <div class="grid grid-cols-4">
                 <div class="col-start-2  col-span-4">
          <span class="sub-table-heading"> Population </span>
                 </div>
                 <div class="col-start-2  col-span-4">
          <span class="sub-table-field"> {{ item.Population }}  </span>
                 </div>
             </div>
        </div>
        <div class="col-start-9  col-span-4">
          <div class="grid grid-cols-4">
                 <div class="col-start-4">
          <span class="sub-table-heading"> Source </span>
                 </div>
                 <div class="col-start-4">
          <span class="sub-table-field">  {{ item.Population }}  </span>
                 </div>
             </div>
        </div>
        </div>
        </td>
    </tr>
  </tbody>
</table>
    </div>
    <div class="mt-6 col-start-6">
      <button v-if="records.length < recordsCopy.length" @click="showMore" class="button">SHOW MORE</button>
    </div>
</div>
    <div v-if="dataProcessing" class="container mx-auto">
<div class="flex items-center justify-center ">
    
<div>
    <div class="w-24 h-24 border-4 border-blue-400 border-solid rounded-full animate-spin custom-spinner"></div>
</div>
</div>
</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
    records: [],
    recordsCopy: [],
    selectedIndex: '',
    selectYear: '',
    year: ['2021', '2020', '2019', '2018', '2018', '2017', '2016', '2015', '2014', '2013'],
    backgroundImage: require("@/assets/images/background1.jpg"),
    count: 1,
    dataProcessing: true
        }
    },

    created () {
         this.$store.dispatch('selectedPage', 'Page2');
        this.$axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population').then(response => {       
           this.recordsCopy  = response.data.data;
           this.dataProcessing = false;
           this.records = this.recordsCopy.slice(0,2);
        })    
    },
     methods : {
         showMore () {
            // this.selectYear = 'Filter Year';
             this.records = this.recordsCopy.slice(0, (this.records.length) + 2 );
         },
         toggle (index) {
             if (this.selectedIndex === index) {
               this.selectedIndex = -1;
               return;  
             }
             this.selectedIndex = index;
         },
         filterByYear () {
            var filteredRecords = [];
         console.log(this.selectYear);
         var exist = false;
         this.records.filter((data)=> {
             exist = data.Year.includes(this.selectYear);
            if (exist === true) {
            filteredRecords.push(data);
            }
         });
         if (filteredRecords.length === 0) {
             alert("No Matching record found");
         }
         else {
           this.records = filteredRecords;
         }
         },
         sortYearAscending () {
         this.records = this.records.sort((a, b) => a.Year > b.Year ? 1 : -1);
         },
         sortYearDescending () {
         this.records = this.records.sort((a, b) => a.Year < b.Year ? 1 : -1);
         },
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
.custom-background1 {
background-color: #e5e5e5;
}

.custom-background2 {
background-color: #f9f9f9;
}

.sub-table-heading {
font-size: 12px;
font-weight: 700;
}

.sub-table-field {
font-size: 13px;
}

.button {
    border-radius: 6px;
  border: none;
  color: white;
  padding: 7px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  background-color: #008CBA;
}

.custom-spinner {
  border-top-color:transparent;
  margin:0 auto;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  cursor:pointer;
  font-size: 22px;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 80px;
  font-size: 12px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>