<template>
  <div id="search_form">
    <div class="search_input">
      <input 
        type="text" 
        v-model="searchText" 
        placeholder="Поиск запчастей"
        @keyup.enter="search"
      />
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
        searchText: ''
      }
    },
    methods: {
      search: function(){
        this.$API.post('getItemsCount', `search_string=${this.searchText}`).then(r => {
        console.log(r.data.data)
        });
      }
    }
  }
</script>