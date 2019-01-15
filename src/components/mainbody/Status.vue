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
    <comment-comp 
        v-for="(comment, index) of status.comments" 
        :key="index" 
        :comment="comment" 
        @save="save" 
        @delete-comment="deleteComment($event)"
        @like="like($event)"
    />
    <button v-if="!addingNewComment" @click="addNewComment">Add Comment</button>
    <div v-else>
        <input type="text" v-model="newComment">
        <button @click="saveComment">Save</button>
        <button @click="cancelComment">Cancel</button>
    </div>
  </div>
</template>


<script>
import Tweet from './Tweet';
import CommentComp from './CommentComp';
import Comment from './../../models/comment.js';
import format from '../../../node_modules/date-fns/format';
import hljs from '../../../node_modules/highlight.js';
import Post from './../../models/post.js';
import httpUtils from '../../server/httpUtils';
import Utilities from '../../models/utilities.js';
import 'highlight.js/styles/github.css'

const { getHash } = Utilities;

export default {
    name: 'Status',
    components: {
        Tweet,  // TODO: Remove unused Tweet compononent
        CommentComp
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
            actionStatus: '',
            newComment: '',
            addingNewComment: false,
            commentIds: null
        }
    },
    computed: {
        formattedDate() {
            return format(this.date, 'MM/DD/YYYY HH:mm');
        },

        // enables Markdown formmatting and syntax highlighting.
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
        // emit a confirm-delete event so parent (<Main/>) can delete the post
        deletePost() {
            this.$emit('confirm-delete', this.status);
        },

        // enables editing the post
        editPost() {
            this.editable = true;
            this.editString = this.status.body;
        },

        // cancels the edit without making changes
        cancelEdit() {
            this.editable = false;
            this.editString = '';
        },

        // sends the updated post to the appropriate PUT endpoint
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

        // shares a tweet's-length worth of the post on the user's twitter
        // tweet endpoint will modify the post to fit a tweet with a #100DaysOfCode hashtag
        tweetStatus() {
            // TODO: Authorize and use user's twitter, not my own
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
        },

        // enables the user to add a new comment
        addNewComment() {
            this.addingNewComment = true;
        },

        // cancels the comment without making any changes
        cancelComment() {
            this.newComment = '';
            this.addingNewComment = false;
        },

        // adds a new comment and updates it on the database
        saveComment() {
            this.status.newComment(new Comment({
                message: this.newComment,
                author: 'unknown',
                date: new Date(),
                id: getHash(this.commentIds)
            }));
            this.save();
            this.newComment = '';
            this.addingNewComment = false;
        },

        // updates the status on the database using PUT
        save() {
            let options = this.setUpdateOpts(this.status);
            let url = httpUtils.setURIString({ params: ['update', this.status.id]});
            fetch(url, options);
        },

        // deletes a comment and updates the database
        deleteComment(id) {
            this.status.comments = this.status.comments.filter(comment=> comment.id !== id);
            this.save()
        }
    },
    created() {
        // TODO: remove this closure
        this.setUpdateOpts = httpUtils.createHeader({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT'
        });

        // create a set of ids to uniquely identify comments by
        let ids = this.status.comments.map(comment => comment.id);
        this.commentIds = new Set(ids);
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
