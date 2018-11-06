<template>
    <div class="flex-container">
        <div class="main-body">
            <StatusPost
                v-if="roundsExist"
                @new-post="newPost"
                class="component-padding"
                v-bind:selectedRound="selectedRound"
                v-bind:selectedRoundDate="selectedRoundDate"
            />
            <Intro
                class="component-padding"
                v-bind:username="userName"
                v-else
            />
            <Status
                class="component-padding"
                v-for="status in statuses"
                :key="status.id"
                v-bind:status="status"
                @delete-post="deletePost($event)"
            />
        </div>
        <div class="content-list">
            <h4>Review Settings</h4>
            <ul>
                <li><router-link to="settings">Settings</router-link></li>
            </ul>
            <h4 v-if="statuses.length !== 0">Contents:</h4>
            <Contents
                v-for="status in statuses"
                :key="status.id"
                :contentTitle="status.title"
                :contentDate="status.date"
            />
        </div>
    </div>
</template>

<script>
import StatusPost from './StatusPost';
import Status from './Status';
import Intro from './Intro';
import getHash from './../../models/gethash.js';
import Contents from './Contents';

export default {
    name: 'Main',
    props: {
        numRounds: Number,
        selectedRound: Number,
        selectedRoundDate: Date,
        username: String
    },
    components: {
        StatusPost,
        Status,
        Intro,
        Contents
    },
    data() {
        return {
            statuses: [],
            hashBin: new Set(),
            userName: this.username,
            settings: window.location.origin + '/settings'
        }
    },
    computed: {
        roundsExist() {
            return this.numRounds > 0;
        }
    },
    methods: {
        newPost(post) {
            post.id = getHash(this.hashBin);
            this.statuses.unshift(post);
        },
        deletePost(event) {
            this.statuses = this.statuses.filter((status) => status.id !== event.id);
        },
        go() {

        }
    }
}
</script>

<style scoped>

    h4 {
        margin-right: 1rem;
    }

    li {
        font-size: 0.75rem;
    }

    .main-body {
        width: 80%;
    }

    .content-list {
        width: 20%;
    }

</style>

