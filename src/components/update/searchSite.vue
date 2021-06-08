<template>
  <div>
      <div class="d-flex row align-items-center m-0 pl-3 position-relative" style="height:50px;">
        <svg style="position:absolute;left:18px;z-index:99;" t="1611741007546" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2806" width="22" height="22"><path d="M508 675.5a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#4D4D4D" p-id="2807"></path><path d="M919.1 875.8L662.3 619c45.5-55.3 72.8-126.1 72.8-203.2 0-176.7-143.3-320-320-320s-320 143.3-320 320c0 175.8 141.8 318.5 317.2 320 0.8 0.1 1.5 0.1 2.3 0.1 17.8 0 32.2-14.4 32.2-32.1 0-17.6-14.2-31.8-31.8-32.1-141.3 0-255.9-114.6-255.9-255.9S273.7 159.9 415 159.9s256 114.6 256 255.9c0 70.7-28.7 134.8-75.1 181.1-11.9 12.1-11.9 31.7 0.2 43.8l279 279c12.1 12.1 31.9 12.1 43.9 0 12.2-12 12.2-31.8 0.1-43.9z" fill="#4D4D4D" p-id="2808"></path></svg>
          <input type="search" class="form-control pl-4 col-9" placeholder="搜索附近位置">
          <router-link to="/whereAreYou" class="col-3">取消</router-link>
      </div>
      <div>地点</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>