<template>
  <div class="home">
 <cube-slide
 :data="slider"
 :interval="5000">
   <cube-slide-item v-for="item in slider" :key="item.id">
     <router-link  :to="`/detail/${item.id}`">
       <img :src="item.img" class="slider">
     </router-link>
   </cube-slide-item>
 </cube-slide>
    <goods-list :goods="filterGoods"></goods-list>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodsList from '@/components/GoodsList.vue';
export default {
  name: 'home',
  data() {
    return {
      slider: [],
      goods:[],// 所有商品
      selectedKeys: [], // 分类过滤时使用
      keys: [] // 分类
    }
  },
  components: {
    GoodsList
  },
  async created(){
    // {data:{},status}
   const {
     data:{data:goods,slider,keys} // 重命名
   }=await this.$http.get('/api/goods');
   console.log(goods,slider);
  this.slider=slider;
  this.goods=goods;
  this.keys=keys;
  this.selectedKeys=[...this.keys]; // 默认全部分类
  },
  computed:{
    filterGoods(){
      let ret = [];
      this.selectedKeys.forEach(v=>{
        ret=ret.concat(this.goods[v]);
      });
      return ret;
    }
  }
}
</script>
<style scoped>
  .cube-slide{
    height:auto;
  }
  .cube-slide-item > a >img {
    width: 100%;
  }
</style>
