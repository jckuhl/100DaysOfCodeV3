<template>
    <div>
        <RoundPost
            @add-new-round="addNewRound"
            class="component-padding"
        />
        <Round
            class="component-padding"
            v-for="round in rounds"
            :key="round.id"
            v-bind:roundNum="round.num"
            v-bind:roundID="round.id"
            v-bind:roundDate="round.date"
            v-bind:selectedID="selectedID"
            @round-selected="roundSelected"
            @set-post-round="setPostRound"
        />
    </div>
</template>


<script>
import Round from './Round';
import RoundPost from './RoundPost';
import getHash from './../../models/gethash.js';

export default {
    name: 'Sidebar',
    components: {
        Round,
        RoundPost
    },
    data() {
        return {
            hashBin: new Set(),
            rounds: [],
            selectedID: null
        }
    },
    methods: {
        addNewRound() {
            let id = getHash(this.hashBin);
            this.selectedID = id;
            this.rounds.unshift({
                num: this.rounds.length + 1,
                date: new Date(),
                selected: true,
                id: id
            });
            this.$emit('round-created', this.rounds.length);
        },
        roundSelected(id) {
            this.selectedID = id;
        },
        setPostRound(round, date) {
            this.$emit('set-post-round', round, date);
        }
    },
    computed: {
        getRoundNum() {
            return this.rounds.length;
        }
    }
}
</script>

<style scoped>

</style>
