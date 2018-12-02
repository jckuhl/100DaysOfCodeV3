<template>
    <div>
        {{ comment.message }}
        <p>{{ comment.likes }}
            <button>Like</button>
            <button>Reply</button>
            <button>Delete</button>
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
}
</script>
