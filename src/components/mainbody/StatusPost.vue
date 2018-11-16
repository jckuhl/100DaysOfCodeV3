<template>
    <div class="border-bottom border-right">
        <h1>Create A New Post!</h1>
        <h2>Round {{ round }} Day {{ currentDay }}</h2>
        <p>
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="title">
        </p>
        <p>
            <label for="body">Description:</label>
            <small class="falseLink" @click="showHelp" >Markdown Formatting</small>
            <MarkdownHelp
                :posX="posX"
                :posY="posY"
                @close-md="hideHelp"
                v-if="markdownOpen"
            />
        </p>
        <p>
            <textarea
                id="body"
                placeholder="Describe what you did today!  Feel free to use Markdown for formatting!"
                v-model="body"
            ></textarea>
        </p>
        <button
            @click="submitPost($event)"
            v-bind:disabled="!body || !title"
        >Submit</button>
    </div>
</template>

<script>
import MarkdownHelp from './MarkdownHelp';
import differenceInDays from '../../../node_modules/date-fns/difference_in_days';
import addDays from '../../../node_modules/date-fns/add_days';
import Post from './../../models/post.js';
import httpUtils from './../../server/httpUtils.js';

export default {
    name: 'StatusPost',
    components: {
        MarkdownHelp
    },
    props: {
        selectedRound: Number,
        selectedRoundDate: Date
    },
    data() {
        return {
            round: this.selectedRound,
            day: 1,
            currentDate: new Date(),
            title: '',
            body: '',
            markdownOpen: false,
            top: "500px",
            left: "100px",
            height: 0
        }
    },
    watch: {
        selectedRound: {
            handler: function() {
                this.round = this.selectedRound;
            }
        }
    },
    computed: {
        currentDay() {
            return differenceInDays(addDays(this.currentDate, 1), this.selectedRoundDate);
        }
    },
    methods: {
        submitPost() {
            const post = new Post({
                id: null,
                title: this.title,
                body: this.body,
                round: this.round,
                date: new Date(),
            });
            this.$emit('new-post', post);
            const options = httpUtils.setHTTPOptions({ method: 'POST', body: post});
            console.log(options);
            const url = httpUtils.setURIString({ params: ['post']});
            fetch(url, options);
            this.title = '';
            this.body = '';
        },
        showHelp() {
            this.markdownOpen = true;
            this.posX = event.x;
            this.posY = event.y;
        },
        hideHelp() {
            this.markdownOpen = false;
        }
    }
}
</script>

<style scoped>
    textarea {
        width: 80%;
        height: 100px;
        font-size: 1rem;
        resize: vertical;
    }

    .falseLink {
        text-decoration: underline;
        cursor: context-menu;
    }
</style>
