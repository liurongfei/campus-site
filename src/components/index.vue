<template>
  <div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"  style="padding-bottom:60px;"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"  style="padding-bottom:60px;"></router-view>
    <div class="bg-light d-flex fixed-bottom justify-content-around align-items-center w-100" style="height:50px">
        <router-link class="" to='/wall'>黑板墙</router-link>
        <router-link class="" to='/message'>消息</router-link>
        <router-link class="" to='/match'>匹配</router-link>
        <router-link class="" to='/update'>动态</router-link>
        <router-link class="" to='/personal'>我的</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>