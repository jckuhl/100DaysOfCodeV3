<template>
    <div>
        <p><a :href="resource.url">{{ resource.title | title }}</a></p>
        <p>{{ resource.blurb }}</p>
        <div v-if="custom">
            <Tweet :body="resource.blurb" />
            <button @click="deleteResource">Delete</button>
        </div>
    </div>
</template>

<script>
import Tweet from './../mainbody/Tweet';

export default {
    components: {
        Tweet
    },
    props: {
        resource: {
            id: String,
            url: String,
            title: String,
            blurb: String
        },
        custom: Boolean
    },
    methods: {
        deleteResource() {
            this.$emit('delete-resource', this.resource.id);
        }
    }
}
</script>

