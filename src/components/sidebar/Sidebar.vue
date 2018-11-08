<template>
    <div>
        <round-post
            @add-new-round="addNewRound"
            class="component-padding"
        />
        <round-component
            class="component-padding"
            v-for="round in rounds"
            :key="round.id"
            :round="round"
            :selectedID="selectedID"
            @round-selected="roundSelected"
            @set-post-round="setPostRound"
        />
    </div>
</template>


<script>
import RoundComponent from './Round';
import RoundPost from './RoundPost';
import getHash from './../../models/gethash.js';
import httpUtils from '../../server/httpUtils';
import Round from './../../models/round.js';
import Utilities from '../../models/utilities';

export default {
    name: 'Sidebar',
    components: {
        RoundComponent,
        RoundPost
    },
    data() {
        return {
            hashBin: new Set(),
            rounds: [],
            selectedID: null,
            setSubmitOptions: null,
        }
    },
    methods: {
        addNewRound() {
            let id = getHash(this.hashBin);
            this.selectedID = id;
            const round = new Round({
                num: this.rounds.length + 1,
                date: new Date(),
                selected: true,
                id: id
            });
            let options = this.setSubmitOptions(round);
            let url = httpUtils.setURIString({ params: ['newround']});
            fetch(url, options);
            this.rounds.unshift(round);
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
    },
    async created() {
        // create a Round object from object literal
        const populateRounds = round => new Round({
                num: round.num,
                id: round.id,
                date: round.date,
                selected: round.selected
        });

        // set the default options for submitting a round to the server
        this.setSubmitOptions = httpUtils.createHeader({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const { isNotValidSessionObject, byDate } = Utilities;

        // check if rounds are in session storage, if not fetch from server, then store in storage.
        let rounds = sessionStorage.getItem('rounds');
        if(isNotValidSessionObject(rounds)) {
            let uri = httpUtils.setURIString({ params: ['rounds'] });
            rounds = await httpUtils.ajax(uri);
            this.rounds = rounds.map(populateRounds).sort(byDate);
        }
        sessionStorage.setItem('rounds', JSON.stringify(this.rounds));
        this.$emit('round-created', this.rounds.length);
        this.hashBin = Utilities.hashBinPopulator(this.rounds);
    }
}
</script>

<style scoped>

</style>
