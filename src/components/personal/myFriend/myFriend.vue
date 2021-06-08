<template>
  <div class="d-flex flex-column">
    <div class="w-100 bg-info d-flex align-items-center" style="height:50px">
        <span class="text-left flex-grow-1">
            <router-link to="/personal" class="row m-0">
            <svg t="1610188993314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2903" width="30" height="30"><path d="M694.272 809.024l-295.808-286.848 295.36-274.752a32 32 0 0 0-43.616-46.848l-320 297.696a32 32 0 0 0-0.512 46.4l320 310.304a32.032 32.032 0 0 0 44.576-45.952" p-id="2904" fill="#ffffff"></path></svg>
            </router-link>
        </span>
        <span class="text-center flex-grow-1">
                <router-link to='/friend' class="p-0 friend-bar friends" @click.native="change(0)">好友</router-link>
                <router-link to='/follows' class="mx-3 p-0 friend-bar" @click.native="change(1)">关注</router-link> 
                <router-link to='/followers' class="p-0 friend-bar" @click.native="change(2)">粉丝</router-link>
        </span>
        <span class="flex-grow-1"></span>
   </div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script>
export default {
  methods:{
    change(index){
      $($(".friend-bar")[index]).css({"color":"red","font-size":"18px"}).siblings().css({"color":"black","font-size":"16px"});
    }
  }
}
</script>

<style>
.friends{
  color:green;
  font-size:18px;
}
</style>