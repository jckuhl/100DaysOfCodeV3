<template>
    <div class="border-bottom">
        <h2
            @mouseover="grow()"
            @mouseout="shrink()"
            @click="newRound"
            v-bind:class="{ shadowText: isShadowed }"
        >Add New Round</h2>
    </div>
</template>

<script>
export default {
    name: 'RoundPost',
    data() {
        return {
            isShadowed: false
        }
    },
    methods: {
        grow() {
            this.isShadowed = true;
        },
        shrink() {
            this.isShadowed = false;
        },
        newRound() {
            this.isShadowed = false;
            this.$emit('add-new-round');
        }
    }
}
</script>

<style scoped>
    h2 {
        margin-bottom: 0;
        cursor: pointer;
    }
    .shadowText {
        font-size: 1.60em;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.25);
    }
</style>

