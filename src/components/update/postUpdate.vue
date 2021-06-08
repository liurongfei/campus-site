<template>
  <div class="d-flex flex-column">
      <div class="d-flex bg-info justify-content-between align-items-center px-3" style="height:50px;">
            <router-link to="/update" class="align-self-center"><svg t="1610188993314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2903" width="30" height="30"><path d="M694.272 809.024l-295.808-286.848 295.36-274.752a32 32 0 0 0-43.616-46.848l-320 297.696a32 32 0 0 0-0.512 46.4l320 310.304a32.032 32.032 0 0 0 44.576-45.952" p-id="2904" fill="#ffffff"></path></svg></router-link>
            <div style="font-size:18px;">动态</div>
            <div @click="post" style="border:1px grey solid;border-radius:5px;font-size:13px;" class="py-1 px-2 mr-2 align-self-center">发表</div>
      </div>
      <div class="w-100 px-3">
        <div style="font-size:13px;">
            <textarea placeholder="分享这一刻" name="" id="update-input" cols="25" rows="4" v-model="updateContent" class="w-100 border-0"></textarea>
        </div>
        <div class="row">
            <div v-for="(img,index) in imgs" :key="img.id" class="col-4 my-2 position-relative">
                <svg @click="delImg(index)" t="1611733110783" style="background-color:white;border-radius:50%;right:0;top:-10px;width:22px;height:22px;" class="icon position-absolute" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6245" width="23" height="23"><path d="M815.791 198.623C732.117 114.949 620.867 68.868 502.535 68.868c-118.332 0-229.582 46.081-313.255 129.755-83.673 83.673-129.754 194.923-129.754 313.255S105.607 741.46 189.28 825.133c83.673 83.675 194.923 129.756 313.255 129.756s229.582-46.081 313.256-129.756c83.673-83.673 129.754-194.923 129.754-313.255s-46.081-229.582-129.754-313.255z m-313.256 697.75c-212.01 0-384.494-172.484-384.494-384.495 0-212.01 172.484-384.494 384.494-384.494 212.011 0 384.494 172.484 384.494 384.494 0 212.011-172.483 384.495-384.494 384.495z" fill="#f4ea2a" p-id="6246"></path><path d="M670.166 344.493c-11.426-11.426-29.951-11.426-41.377 0L502.535 470.747 376.281 344.493c-11.426-11.426-29.951-11.426-41.377 0-11.426 11.426-11.426 29.951 0 41.377l126.254 126.254-126.254 126.253c-11.426 11.426-11.426 29.952 0 41.378 5.713 5.713 13.2 8.569 20.688 8.569 7.488 0 14.975-2.857 20.688-8.569L502.534 553.5l126.254 126.255c5.714 5.713 13.2 8.569 20.688 8.569 7.487 0 14.976-2.857 20.688-8.569 11.426-11.426 11.426-29.952 0-41.378L543.912 512.124 670.166 385.87c11.426-11.427 11.426-29.951 0-41.377z" fill="#f4ea2a" p-id="6247"></path></svg>
                <img :src="img.path" alt="" width="75" height="75" style="border-radius:5px;">
            </div>
            <div v-if="imgNums<9" class="position-relative col-4 my-2">
                <div style="width:75px;height:75px;background-color:rgb(235, 235, 235);text-align:center;line-height:75px"><svg t="1611730917743" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3429" width="50" height="50"><path d="M810.666667 490.666667a21.333333 21.333333 0 0 1 3.84 42.325333L810.666667 533.333333H213.333333a21.333333 21.333333 0 0 1-3.84-42.325333L213.333333 490.666667h597.333334z" fill="#cdcdcd" p-id="3430"></path><path d="M512 192a21.333333 21.333333 0 0 1 20.992 17.493333L533.333333 213.333333v597.333334a21.333333 21.333333 0 0 1-42.325333 3.84L490.666667 810.666667V213.333333A21.333333 21.333333 0 0 1 512 192z" fill="#cdcdcd" p-id="3431"></path></svg></div>
                <input type="file" multiple @change="add" ref="images">
            </div>
        </div>
        <hr class="w-100">
      </div>
      <div class="px-3">
          <router-link to="/whereAreYou">
              <div class="d-flex justify-content-between">
                  <div>所在位置</div>
                  <div style="font-size:14px;" class="d-flex align-items-center"><span>选择地点</span><svg t="1611732275830" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5071" width="20" height="20"><path d="M670.37 558.41c-12.31 0-24.56-4.69-33.94-14.06L319.68 227.53c-18.75-18.75-18.75-49.12 0-67.88s49.12-18.75 67.88 0l316.75 316.81c18.75 18.75 18.75 49.12 0 67.88-9.38 9.38-21.63 14.07-33.94 14.07z" fill="#cdcdcd" p-id="5072"></path><path d="M353.62 878.41c-12.31 0-24.56-4.69-33.94-14.06-18.75-18.75-18.75-49.12 0-67.88l316.75-316.81c18.75-18.75 49.12-18.75 67.88 0s18.75 49.12 0 67.88l-316.75 316.8c-9.38 9.38-21.63 14.07-33.94 14.07z" fill="#cdcdcd" p-id="5073"></path></svg></div>
              </div>
              <hr class="w-100 my-2">
          </router-link>
          <router-link to="/whoCanSee">
              <div class="d-flex justify-content-between">
                  <div>谁可以看</div>
                  <div style="font-size:14px;" class="d-flex align-items-center"><span>公开</span><svg t="1611732275830" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5071" width="20" height="20"><path d="M670.37 558.41c-12.31 0-24.56-4.69-33.94-14.06L319.68 227.53c-18.75-18.75-18.75-49.12 0-67.88s49.12-18.75 67.88 0l316.75 316.81c18.75 18.75 18.75 49.12 0 67.88-9.38 9.38-21.63 14.07-33.94 14.07z" fill="#cdcdcd" p-id="5072"></path><path d="M353.62 878.41c-12.31 0-24.56-4.69-33.94-14.06-18.75-18.75-18.75-49.12 0-67.88l316.75-316.81c18.75-18.75 49.12-18.75 67.88 0s18.75 49.12 0 67.88l-316.75 316.8c-9.38 9.38-21.63 14.07-33.94 14.07z" fill="#cdcdcd" p-id="5073"></path></svg></div>
              </div>
              <hr class="w-100 my-2">
          </router-link>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            updateContent:"",
            user:{},
            isHide:false,
            imgs:[],
            imgNums:0,
            dynamicStatus:0,
            files:[],
        }
    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem("user"));
    },
    beforeRouteLeave(to,from,next){
        if(to.name=='whoCanSee' ||to.name=='whereAreYou'){
          from.meta.keepAlive = true;
          console.log("进入"+to.name+"现在需要缓存")
        }else {
          from.meta.keepAlive = false;
          console.log("进入"+to.name+"现在不需要缓存")
        }
        next();
    },
    methods:{
        post(){
            var fd = new window.FormData();
            for (let index = 0; index < this.files.length; index++) {
                fd.append("images"+index,this.files[index]);
            }
            fd.append("dynamicContent",this.updateContent);
            fd.append("dynamicStatus",this.dynamicStatus);
            fd.append("userId",this.user.userId);
            this.$axios.post('http://localhost/dynamic/post',fd,{
                headers:{"Content-Type":"multipart/form-data"}
            })
            .then(()=>{
                this.$router.push({path:'/update',query:{update:true}});
            })
        },
        add(){
            var files = this.$refs.images.files;
            const imgs = document.getElementsByTagName('img');
            for(let i = 0;i<files.length&&this.files.length<9;i++){
                this.files.push(files[i]);
                var url = null;
                if(window.createObjectURL!=undefined){
                    url = window.createObjectURL(files[i]);
                }else if(window.URL!=undefined){
                    url = window.URL.createObjectURL(files[i]) ;
                }else if(window.webkitURL!=undefined){
                    url = window.webkitURL.createObjectURL(files[i]) ;
                }
                this.imgs.push({file:files[i],path:url});
                this.imgNums++;
            }
            console.log(this.files);
            console.log(this.imgs);
        },
        delImg(index){
            this.imgs.splice(index,1);
            this.imgNums--;
        }
    }
}
</script>

<style scoped>
#update-input:focus{
    outline: none;
}
input{
    position: absolute;
    left: 0;
    top: 0;
    width:75px;
    height:75px;
    opacity: 0;
    background-color: rgb(224, 223, 223);
}
</style>