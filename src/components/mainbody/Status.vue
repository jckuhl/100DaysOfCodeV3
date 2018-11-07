<template>
  <div class="border-bottom border-right">
    <h2 v-if="!editable">{{ status.title }}</h2>
    <input v-else type="text" v-model="status.title">
    <h3>{{ formattedDate }}</h3>
    <p v-html="formattedBody" v-if="!editable"></p>
    <textarea v-else v-model="editString"></textarea>
    <p>
        <button @click="editPost" v-if="!editable">Edit</button>
        <button v-else @click="saveEdit">Save</button>
        <button @click="deletePost">Delete</button>
    </p>
  </div>
</template>


<script>
import format from '../../../node_modules/date-fns/format';
import hljs from '../../../node_modules/highlight.js';
import Post from './../../models/post.js';
import httpUtils from '../../server/httpUtils';

export default {
    name: 'Status',
    props: {
        status: Post
    },
    data() {
        return {
            date: this.status.date,
            editable: false,
            editString: '',
            setUpdateOpts: null
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
                        } catch (__) {}
                    }
                    return ''; // use external default escaping
                }
            });
            return md.render(this.status.body)
        }
    },
    methods: {
        deletePost() {
            this.$emit('delete-post', this.status);
        },
        editPost() {
            this.editable = true;
            this.editString = this.status.body;
        },
        saveEdit() {
            this.editable = false;
            this.status.body = this.editString;
            let options = this.setUpdateOpts(this.status);
            let url = httpUtils.setURIString({ params: ['update', this.status.id]});
            fetch(url, options);
        }
    },
    created() {
        this.setUpdateOpts = httpUtils.createHeader({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT'
        })
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

