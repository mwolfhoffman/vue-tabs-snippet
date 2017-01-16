// Creates component named tabs
Vue.component('tabs', {
    template: `<div>
    <div class="tabs">
  <ul>
    <li v-for="tab in tabs" :class="{ 'is-active' : tab.isActive }">
    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a></li>
  </ul>
</div>

<div class="tab-details">
<slot></slot>
</div>


</div>`
    ,

    // console logs children of tabs component
    // which would be the 3 individual tabs once page loads  
    mounted() {
        console.log(this.$children)
    },


    //when tabs is returned below as $children, it will be in an array; 
    data() {
        return {
            tabs: []
        }
    },


    // once tabs are created, we can target children with this.tabs
    created() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name)
            })
        }
    }
});


// Creates tab component
Vue.component('tab', {
    //template will accept anything passed throught a <tab> tag in index.html
    template: `<div v-show="isActive"><slot><slot></div>`,
    // need to declare props so they can be used in the JS files since passed in through html 
    props: {
        name: { required: true },
        selected: { default: false }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        href() {
            return "#" + this.name.toLowerCase().replace(/ /g, '-');
        }
    },
    mounted() {
        this.isActive = this.selected;
    }
})

new Vue({
    el: '#root'
})