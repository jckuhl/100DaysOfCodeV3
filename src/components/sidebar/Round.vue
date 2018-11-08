<template>
    <div 
        v-bind:class="{isSelected: selected, 'border-bottom': !selected}" 
        @click="selectRound">
            <h1>Round {{ round.num }}</h1>
            <p>You started this round on {{ getDate }}</p>
            <p>This round ends on {{ targetDate }}</p>
            <p v-if="daysLeft > 0">You have {{ daysLeft }} days left</p>
            <p v-else>This round has ended!</p>
    </div>
</template>

<script>
import format from '../../../node_modules/date-fns/format';
import addDays from '../../../node_modules/date-fns/add_days';
import subDays from '../../../node_modules/date-fns/sub_days';
import differenceInDays from '../../../node_modules/date-fns/difference_in_days';

export default {
    name: 'Round',
    props: {
        round: Object,
        selectedID: String
    },
    data() {
        return {
            selected: false,
            totalDays: 100
        }
    },
    watch: {
        selectedID: {
            handler: function() {
                this.sendRoundAndDate();
            }
        }
    },
    computed: {
        getDate() {
            return format(this.round.date, 'MM/DD/YYYY');
        },
        targetDate() {
            return format(addDays(this.round.date, this.totalDays), 'MM/DD/YYYY');
        },
        daysLeft() {
            return differenceInDays(addDays(this.round.date, this.totalDays), new Date());
        }
    },
    methods: {
        sendRoundAndDate() {
            this.selected = this.selectedID === this.id;
            if(this.selected) {
                this.$emit('set-post-round', this.round.num, this.round.date);
            }
        },
        selectRound() {
            this.$emit("round-selected", this.round.id);
        }
    },
    mounted: function() {
        this.sendRoundAndDate();
    }
}
</script>

<style scoped>
    .isSelected {
        background-color: rgba(0,0,0,0.25);
    }
</style>
