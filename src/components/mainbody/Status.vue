<template>
  <div class="border-bottom border-right" :id="status.id">
    <h2 v-if="!editable">{{ status.title }}</h2>
    <input v-else type="text" v-model="status.title">
    <h3>{{ formattedDate }}</h3>
    <p v-html="formattedBody" v-if="!editable"></p>
    <textarea v-else v-model="editString"></textarea>
    <p>
        <button @click="editPost" v-if="!editable">Edit</button>
        <button v-else @click="saveEdit">Save</button>
        <button @click="deletePost">Delete</button>
        <button v-if="editable" @click="cancelEdit">Cancel</button>
        <button @click="tweetStatus">Tweet</button>
    </p>
    <p v-if="actionStatus">{{ actionStatus }}</p>
  </div>
</template>


<script>
import Tweet from './Tweet';
import format from '../../../node_modules/date-fns/format';
import hljs from '../../../node_modules/highlight.js';
import Post from './../../models/post.js';
import httpUtils from '../../server/httpUtils';
import 'highlight.js/styles/github.css'

export default {
    name: 'Status',
    components: {
        Tweet
    },
    props: {
        status: Post
    },
    data() {
        return {
            date: this.status.date,
            editable: false,
            editString: '',
            setUpdateOpts: null,
            actionStatus: ''
        }
    },
    watched: {
        formattedBody() {
            console.log('hi');
        }
    },
    computed: {
        formattedDate() {
            return format(this.date, 'MM/DD/YYYY HH:mm');
        },
        formattedBody() {
            const md = require('markdown-it')({
                highlight: function(str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(lang, str).value;
                        // eslint-disable-next-line
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    return ''; // use external default escaping
                }
            });
            return md.render(this.status.body);
        }
    },
    methods: {
        deletePost() {
            this.$emit('confirm-delete', this.status);
        },
        editPost() {
            this.editable = true;
            this.editString = this.status.body;
        },
        cancelEdit() {
            this.editable = false;
            this.editString = '';
        },
        saveEdit() {
            this.editable = false;

            // only submit a new post if changes were made.
            if(this.status.body !== this.editString) {
                this.status.body = this.editString;
                let options = this.setUpdateOpts(this.status);
                let url = httpUtils.setURIString({ params: ['update', this.status.id]});
                fetch(url, options);
            } 

            this.editString = '';
        },
        tweetStatus() {
            let options = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.status)
            }
            let url = httpUtils.setURIString({ params: ['tweet'] });
            fetch(url, options)
                .then(data => data.json())
                .then(twitter => {
                    if(twitter.status === true) {
                        this.actionStatus = 'Tweet successful!';
                    } else {
                        this.actionStatus = twitter.status;
                    }
                })
                .catch(error => console.error(error));
        }
    },
    created() {
        this.setUpdateOpts = httpUtils.createHeader({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT'
        });
    }
}

</script>

<style scoped>
    textarea {
        width: 80%;
        height: 100px;
    }

    table {
        background-color: lightgrey;
    }
</style>
