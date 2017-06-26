<template>
  <div id="search_form">
    <div class="search_input">
      <input type="text" name="search" placeholder="Поиск запчастей">
      <label for="search">
        <icon name="search"></icon>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search_form',
    data() {
      return {
        customers: [
        { id: '1', name: 'user 1', profile_pic: 'https://i.stack.imgur.com/CE5lz.png', email:'ab@gmail.com', phone:'+91959657248', unread:'0' },
        { id: '2', name: 'user 2', profile_pic: 'https://i.stack.imgur.com/CE5lz.png', email:'abcd@gmail.com', phone:'+919456664023', unread:'0' },
        { id: '3', name: 'user 3', profile_pic: 'https://i.stack.imgur.com/CE5lz.png', email:'test@gmail.com', phone:'+919566565065', unread:'0' },
        { id: '4', name: 'user 4', profile_pic: 'https://i.stack.imgur.com/CE5lz.png', email:'sample@gmail.com', phone:'+916466004566', unread:'0' }
        ],
        query: ''
      }
    }
  }
</script>

<style scoped>
  .search_input{
    position: relative;
  }
  .search_input label {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .search_input input[type="text"]{
    border-radius: 15px;
    height: 30px;
    padding: 0 25px;
    font-size: 14px;
    width: 460px;
    border: 1px solid #000;
    outline: none;
  }
</style>
