<template lang="html">
  <div>
    <h2>我是新闻</h2>
   
    <ul>
    	<router-link to="/news/news1" tag="li" @click.native="fn">点击news1111</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'news',
  data(){
  	return {
  		onOff:true
  	}
  },
  methods:{
  	fn(){
  		this.onOff = !this.onOff;
  	}
  }
}
</script>

<style lang="css">
</style>
