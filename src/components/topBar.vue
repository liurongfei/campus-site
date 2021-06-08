<template>
    <div class="w-100 bg-info d-flex align-items-center" style="height:50px">
    <span class="text-left flex-grow-1">
        <router-link :to="returnpath" class="row m-0 py-3">
        <svg t="1610188993314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2903" width="50" height="50"><path d="M694.272 809.024l-295.808-286.848 295.36-274.752a32 32 0 0 0-43.616-46.848l-320 297.696a32 32 0 0 0-0.512 46.4l320 310.304a32.032 32.032 0 0 0 44.576-45.952" p-id="2904" fill="#ffffff"></path></svg>
        </router-link>
    </span>
     <span class="text-center flex-grow-1">{{title}}</span>
     <span class="flex-grow-1"></span>
  </div>
</template>

<script>
export default {
    props:['title',"path"],
    data(){
        return {
            returnpath:this.path,
            id:this.$route.query.id,
        }
    }
}
</script>

<style>

</style>