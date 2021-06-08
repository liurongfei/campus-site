<template>
  <div class="d-flex flex-column">
    <router-link to="/index" class="btn btn-success align-self-start mb-5">返回</router-link>
    <div class="card">
        <div class="card-header">我的发布</div>
        <div class="card-body">
                <router-link to='/myUpdate' class="btn btn-warning p-0">我的动态</router-link>
                <router-link to='/myConfession' class="btn btn-warning p-0">我的表白</router-link> 
                <router-link to='/myMutual' class="btn btn-warning p-0">我的互助</router-link>
                <router-link to='/myColckIn' class="btn btn-warning p-0">我的打卡</router-link>            
        </div>
        <div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>