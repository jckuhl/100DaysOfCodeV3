<template>
    <div>
        {{comment.author}} said {{ comment.message }}
        <p>{{ comment.likes }}
            <button @click="like">Like</button>
            <input type="text" v-model="newReply">
            <button @click="reply" :disabled="newReply===''">Reply</button>
            <button @click="deleteComment">Delete</button>
        </p>
        <p v-for="(reply, index) of comment.replies" :key="index">
            {{ reply }}
        </p>
    </div>
</template>

<script>
import Comment from './../../models/comment.js';

export default {
    name: 'Comment-Comp',
    props: {
        comment: Comment
    },
    data() {
        return {
            newReply: ''
        }
    },
    methods: {
        like() {
            // TODO: replace null with the current user
            this.comment.like(null);
            this.$emit('save', this.comment.id);
        },
        reply() {
            this.comment.addReply(this.newReply);
            this.newReply = '';
            this.$emit('save', this.comment.id);
        },
        deleteComment() {
            this.$emit('delete-comment', this.comment.id);
        }
    }
}
</script>
