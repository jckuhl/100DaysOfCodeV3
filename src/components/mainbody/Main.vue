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
            <Intro class="component-padding"
                :username="userName"
                v-else
            />
            <Status v-for="status in statuses"
                class="component-padding"
                :key="status.id"
                :status="status"
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
                :status="status"
            />
        </div>
    </div>
</template>

<script>
import StatusPost from './StatusPost';
import Status from './Status';
import Intro from './Intro';
import Utilities from './../../models/utilities.js';
import Contents from './Contents';
import httpUtils from '../../server/httpUtils';
import Post from '../../models/post';

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
            populateHashes: null,
            userName: this.username,
            settings: window.location.origin + '/settings',
        }
    },
    computed: {
        roundsExist() {
            return this.numRounds > 0;
        }
    },
    methods: {
        newPost(post) {
            post.id = Utilities.getHash(this.hashBin);
            this.statuses.unshift(post);
            sessionStorage.setItem('statuses', JSON.stringify(this.statuses));
        },
        deletePost(event) {
            this.statuses = this.statuses.filter((status) => status.id !== event.id);
            sessionStorage.setItem('statuses', JSON.stringify(this.statuses));
            let uri = httpUtils.setURIString({ params: [ 'delete', event.id]});
            fetch(uri, { method: 'DELETE'});
        },
        go() {

        }
    },
    async created() {
        let statuses = sessionStorage.getItem('statuses');
        if(!statuses || statuses.length < 0 || !statuses.length[0]) {
            statuses = await httpUtils.ajax('http://localhost:12345/posts');
            this.statuses = statuses.map(post => new Post({
                title: post.title, 
                body: post.body,
                round: post.round,
                date: post.date, 
                id: post.id
            }));
        }
        sessionStorage.setItem('statuses', JSON.stringify(this.statuses));
        this.hashBin = Utilities.hashBinPopulator(this.statuses);
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

