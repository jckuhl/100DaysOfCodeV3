<template>
    <div class="border-bottom">
        <h1>Welcome {{ userName }}</h1>
        <p>This is your log for the <a href="http://www.100daysofcode.com/" target="_blank">#100 Days Of Code!</a>   Add your first round and get started!  Went past 100 days?  Add a new round!  Good luck, have fun, and happy coding.</p>
    </div>
</template>


<script>
export default {
    name: 'Intro',
    props: {
        username: String
    },
    data() {
        return {
            userName: this.username,
        }
    }
}
</script>
