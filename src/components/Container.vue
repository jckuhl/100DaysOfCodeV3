<template>
    <div class="flex-container">
        <Sidebar
            @round-created="roundCreated"
            @set-post-round="setPostRound"
            class="flexy sidebar" />
        <Main
            :numRounds="numRounds"
            :selectedRound="selectedRound"
            :selectedRoundDate="selectedRoundDate"
            :username="username"
            class="flexy main"
        />
    </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar';
import Main from './mainbody/Main';

export default {
    components: {
        Sidebar,
        Main
    },
    data() {
        return {
            numRounds: 0,
            selectedRound: null,
            selectedRoundDate: null,
            username: ''
        }
    },
    methods: {
        roundCreated(numRounds) {
            this.numRounds = numRounds;
        },
        setPostRound(round, date) {
            this.selectedRound = round;
            this.selectedRoundDate = date;
        }
    }
}
</script>
