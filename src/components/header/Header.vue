<template>
    <header>
        <h1><a href="http://www.100daysofcode.com/" target="_blank">#100 Days of Code</a></h1>
        <h2>Welcome {{ userName }}</h2>
    </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
      username: String
  },
  data() {
      return {
          userName: this.username,
      }
  },
  watch: {
      username: {
          handler: function() {
              this.userName = this.username;
          }
      }
  }
}
</script>

<style scoped>
    h1, h2 {
        margin: 0 1rem;
    }

    header {
        background: black;
        padding: 1rem 0;
        margin: 0 0;
        width: 100%;
        color: aliceblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    a {
        text-decoration: none;
    }

    a:visited, a:link, a:focus {
        color: aliceblue;
    }
</style>
