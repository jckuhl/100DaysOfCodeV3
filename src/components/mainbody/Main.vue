<template>
    <div class="flex-container">
        <div class="main-body">
            <StatusPost
                v-if="roundsExist"
                @new-post="newPost"
                class="component-padding"
                :selectedRound="selectedRound"
                :selectedRoundDate="selectedRoundDate"
            />
            <Intro class="component-padding"
                :username="userName"
                v-else
            />
            <Status v-for="status in statuses"
                class="component-padding"
                :key="status.id"
                :status="status"
                @confirm-delete="confirmDelete($event)"
            />
        </div>
        <div class="content-list">
            <h4>Current Stats</h4>
            <h4 v-if="statuses.length !== 0">Contents:</h4>
            <Contents
                v-for="status in statuses"
                :key="status.id"
                :status="status"
            />
        </div>
        <modal :modal="modal" v-if="modalOpen" @close-modal="closeModal" 
                @delete-post="deletePost($event)"/>
    </div>
</template>

<script>
import StatusPost from './StatusPost';
import Status from './Status';
import Intro from './Intro';
import Modal from './../modal/Modal';
import Utilities from './../../models/utilities.js';
import Contents from './Contents';
import httpUtils from '../../server/httpUtils';
import Post from '../../models/post';
import Comment from '../../models/comment.js';

const { getHash, By, isNotValidSessionObject } = Utilities;

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
        Contents,
        Modal
    },
    data() {
        return {
            statuses: [],
            hashBin: new Set(),
            populateHashes: null,
            userName: this.username,
            modal: {
                title: 'Confirm Delete',
                message: 
                    'This will delete the post from memory and cannot be done.  Are you sure you want to do this?',
                btnAction1: 'Cancel',
                btnAction2: 'Okay',
                action1: function() {
                    this.$emit('close-modal');
                },
                action2: function(args) {
                    this.$emit('delete-post', this.modal.data.deleteId);
                },
                data: {}
            },
            modalOpen: false,
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
            sessionStorage.setItem('statuses', JSON.stringify(this.statuses));
        },
        deletePost(id) {
            this.statuses = this.statuses.filter((status) => status.id !== id);
            sessionStorage.setItem('statuses', JSON.stringify(this.statuses));
            let uri = httpUtils.setURIString({ params: [ 'delete', id ]});
            fetch(uri, { method: 'DELETE'});
            this.modalOpen = false;
        },
        closeModal() {
            this.modalOpen = false;
        },
        confirmDelete(event) {
            this.modalOpen = true;
            this.modal.data.deleteId = event.id;
        }
    },
    async created() {
        const populatePosts = post => {
            // Vue expects every status to conform to a Post object
            const newPost = new Post({
                title: post.title, 
                body: post.body,
                round: post.round,
                date: post.date, 
                id: post.id,
            });

            // if there are comments, turn them into Comment objects to satisfy Vue expectations
            // also to allow use of the reply method
            if(post.comments.length > 0) {
                const comments = post.comments.map(comment => {
                    if(comment) {
                        return new Comment({
                            message: comment.message,
                            author: comment.author,
                            date: comment.date
                        })
                    }
                })
                newPost.comments = newPost.comments.concat(comments);
            }
            return newPost;
        }

        let statuses = sessionStorage.getItem('statuses');
        if(isNotValidSessionObject(statuses)) {
            // TODO: Modify uri string to include user id
            let url = httpUtils.setURIString({ params: ['posts']});
            statuses = await httpUtils.ajax(url);
            this.statuses = statuses.map(populatePosts)
                                    .sort(By.DateDesc);
        }
        sessionStorage.setItem('statuses', JSON.stringify(this.statuses));
        let ids = this.statuses.map(status => status.id);
        this.hashBin = new Set(ids);
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

