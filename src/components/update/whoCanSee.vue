<template>
  <div>
      <div class="d-flex bg-info justify-content-between align-items-center px-3" style="height:50px;">
            <router-link to="/postUpdate" class="align-self-center"><svg t="1610188993314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2903" width="30" height="30"><path d="M694.272 809.024l-295.808-286.848 295.36-274.752a32 32 0 0 0-43.616-46.848l-320 297.696a32 32 0 0 0-0.512 46.4l320 310.304a32.032 32.032 0 0 0 44.576-45.952" p-id="2904" fill="#ffffff"></path></svg></router-link>
            <div style="font-size:18px;">谁可以看</div>
            <router-link to="/postUpdate" style="border:1px grey solid;border-radius:5px;font-size:13px;" class="py-1 px-2 mr-2 align-self-center">完成</router-link>
      </div>
      <div class="px-3">
        <label for="public" class="w-100 d-flex align-items-center form-check-label">
            <input id="public" type="radio" name="who" class="form-check" v-model="select">
            <div>
                <div class="who">公开</div>
                <div class="whoDetail">所有人可见</div>
            </div>
        </label>
        <label for="private" class="w-100 d-flex align-items-center form-check-label">
            <input id="private" type="radio" name="who" class="form-check"  v-model="select">
            <div>
                <div class="who">私密</div>
                <div class="whoDetail">仅自己可见</div>
            </div>
        </label>
        <label for="schooler" class="w-100 d-flex align-items-center form-check-label">
            <input id="schooler" type="radio" name="who" class="form-check" v-model="select" >
            <div>
                <div class="who">校友</div>
                <div class="whoDetail">仅同校可见</div>
            </div>
        </label>
        <label for="followers" class="w-100 d-flex align-items-center form-check-label">
            <input id="followers" type="radio" name="who" class="form-check" v-model="select">
            <div>
                <div class="who">粉丝</div>
                <div class="whoDetail">仅好友和粉丝可见</div>
            </div>
        </label>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            select:"",
        }
    }
}
</script>

<style scoped>
.who{
   font-size: 15px;
}
.whoDetail{
    font-size: 12px;
    color: rgb(197, 198, 199);
}
input{
    margin: 0 5px;
    width: 15px;
    height: 15px;
}
</style>