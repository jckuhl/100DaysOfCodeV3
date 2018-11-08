<template>
    <div>
        <a class="twitter-share-button"
            :href="twitURLComposed">
        Tweet</a>
    </div>
</template>

<script>
export default {
    props: {
        body: String
    },
    data() {
        return {
            twitURL: 'https://twitter.com/intent/tweet?text=',
        }
    },
    computed: {
        twitURLComposed() {
            return `${this.twitURL}${this.body}&hashtags=100DaysOfCode`;
        }
    }
}
</script>

<style scoped>

</style>
