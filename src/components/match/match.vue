<template>
  <div>
    <div style="height:300px">
      <div>这里是聊天室</div>
      <form>
        <input type="text" v-model="sendMessage">
        <button @click="send">发送消息</button>
      </form>
      <div>
        <button @click="close">关闭连接</button>
      </div>
      <div>
        <div v-for="message in messages" :key="message.id" class="d-flex justify-content-between">
          <span>{{message.name}}:{{message.content}}</span>
          <span>{{message.time}}</span>
        </div>
      </div>      
    </div>
    <div>
      <div>匹配</div>
      <div>您的昵称：{{this.localUser.userName}}</div>
      <div class="btn btn-primary" @click="match">开始匹配</div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        localUser:{},
        sendMessage:"",
        websocket:null,
        messages:[],
      }
    },
    mounted(){
    /* 与服务器建立websocket连接 */
      this.websocket = new WebSocket("ws://localhost/websocket/1/"+this.localUser.userId);
      this.websocket.onopen = function(){
          console.log("登录成功！")
      };
      this.websocket.onclose = function(){
          console.log("退出登录！")
      }
    },
    destroied(){
      this.websocket.close();
    },
    methods:{
      send(){
        var message = {
            "name":this.localUser.userName,
            "content":this.sendMessage,
            "time":new Date().toLocaleTimeString()
        };
        var json = JSON.stringify(message);
        this.websocket.send(json);
        this.websocket.
        this.sendMessage = "";
      },
      onOpen(){
        var message = {
            "name":"系统消息",
            "content":"您已进入聊天室",
            "time":new Date().toLocaleTimeString()
        };
        this.setMessage(message);
      },
      onClose(){

      },
      onMessage(event){
        console.log(event);
        this.setMessage(JSON.parse(event.data));
      },
      onError(){

      },
      setMessage(message){
        this.messages.push(message);
      },
      match(){
         
      }
    }
}

</script>

<style>

</style>