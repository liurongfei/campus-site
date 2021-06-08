<template>
  <div id="app" class="d-flex flex-column justify-content-center align-items-center">
    <!-- <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <div class="w-50">
      <div>获取验证码
        <div><input type="text"><button>获取</button></div>
        <img :src="path" alt="" @click="getCode">
      </div>
      <div class=" btn btn-info" style="width:100px;" @click="connect">建立连接</div>
      <div>连接状态：{{state}}</div>
      <div v-if="state =='OPEN' " class=" btn btn-info" style="width:100px;" @click="close">断开连接</div>
      <div class="btn btn-info" @click="match">{{matchState}}</div>
      <div v-if="matchState=='断开匹配'"><input type="text" class=" form-control" v-model="matchMsg"><div class="btn btn-info" @click="send($code.MESS_CODE,userId,matchUserId,matchMsg)">发送</div></div>
      <div>
        收到的消息
        <div v-for="msg in messages" :key="msg.id">
          <span>{{msg.name}}:{{msg.message}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import topBar from './components/topBar'
export default {
  name: 'App',
  components:{
    topBar
  },
  data(){
    return {
      socket:null,
      isAuth:false,
      messages:[],
      sendMsg:"",
      state:"CLOSED",
      path:"",
      userId:0,
      matchUserId:0,
      matchMsg:"",
      matchState:"匹配聊天",
    }
  },
  mounted(){
    this.userId = parseInt(prompt("请输入用户id","0"));
    this.getCode();
    this.connect();
  },
  methods:{
    getCode(){
     this.$axios.get(this.$baseUrl+'/util/kaptcha.jpg')
     .then((data)=>{
       var res = data.data;
       if(res.status == 1){
         console.log("发生错误"+res.data)
       }else {
         this.path = 'data:image/png;base64,'+res.data.img;
       }
     })
     .catch((err)=>{
        console.log(err);
     });
    },
    connect(){
      if(window.WebSocket){
        this.socket = new WebSocket("ws://localhost:8082/websocket");
        this.socket.onmessage = this.onmessage;
        this.socket.onopen = this.onopen;
        this.socket.onclose = this.onclose;
      }
    },
    close(){
      if(this.socket.readyState == WebSocket.OPEN){
        this.socket.close();
        if(this.socket.readyState == WebSocket.CLOSED){
          this.state = "CLOSED";
          var obj = {};
          obj.name = "系统消息";
          obj.message = "连接已断开";
          this.messages.push(obj)          
        }
      }
    },
    onopen(){
      console.log(this.socket.readyState);
      if(this.socket.readyState == WebSocket.OPEN){
        this.state = "OPEN";
        console.log("连接成功！");
        this.send(this.$code.AUTH_CODE,this.userId,-1,null);
      }else {
        console.log("连接失败");
      }
    },
    onclose(){
      if(this.socket.readyState == WebSocket.CLOSED){
        this.isAuth = false;
        this.socket = null;
        console.log("连接关闭");
        this.state = "CLOSED";
        var obj = {};
        obj.name = "系统消息";
        obj.message = "连接已断开";
        this.messages.push(obj)
      }
    },
    onmessage(event){
      var data = JSON.parse(event.data);
      console.log("收到消息"+event.data);
      console.log(data);
      console.log(data.message);
      switch(data.code){
        //连接状态
        case this.$code.SYS_AUTH_SUCCESS:
        case this.$code.SYS_AUTH_FAILURE:
          data.name = "系统消息";
          break;
        //普通消息
        case this.$code.MESS_CODE:
          if(data.from == this.userId)
          data.name = data.from+"";
          else 
          data.name = data.to+"";
          break;
        //匹配状态
        case this.$code.SYS_MATCH_SUCCESS:
          if(data.to == this.userId)
            this.matchUserId = data.from;
          else this.matchUserId = data.to;
          data.name = "系统消息";
          this.matchState = "断开匹配";
          break;
        case this.$code.SYS_MATCH_FAILURE:
          this.matchState = "匹配聊天";
          data.name = "系统消息";
          break;
        default:
          data.name = "匿名用户";
      }
      this.messages.push(data);
    },
    send(code,from,to,message){
      if(this.socket == null) return;
      if(this.socket.readyState == WebSocket.OPEN || auth){
        var obj = {};
        obj.code = code;
        obj.from = from;
        obj.to = to;
        obj.message = message;
        this.socket.send(JSON.stringify(obj));
      }
    },
    match(){
      if(this.matchState == "匹配聊天"){
        this.send(this.$code.Match_CODE,this.userId,-1,null);
        this.matchState = "匹配中";
      }else if(this.matchState == "断开匹配"){
        $("#matchSend").hide();
      }

    },
  }
}
</script>

<style>
#app{
  position: relative;
  height: 100vh;
}
a{
  color: black;
}
a:hover{
  color: black;
  text-decoration: none;
}
</style>
