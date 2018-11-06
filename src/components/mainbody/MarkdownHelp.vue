<template>
    <div @click="close" ref="md" class="md-box" :style="{top: top, left: left}" >

        <p>MarkDown provides the following formatting options:</p>
        <ul>
            <li>*italics* or _italics_: <em>italic text</em></li>
            <li>**bold** or __bold__: <strong>bold text</strong></li>
            <li>***both*** or ___both___: <em><strong>bold and italic</strong></em></li>
            <li>  *list item:  List item (two spaces and an asterisk)</li>
            <li>1. list item:  Ordered list item</li>
            <li>   list item:  Indented list item (three spaces inside a list)</li>
            <li>[Link text](url):  Link</li>
            <li>[Link text](url, title):  Link with title</li>
            <li>&lt;url&gt;:  Link with a url (must have http or https prefix)</li>
            <li>![alt text](image url):  Image</li>
            <li>`Code`:  Inline code (backticks)</li>
            <li>```Code``` Block code (backticks)</li>
            <li>&gt; Blockquote: Block quotes</li>
        </ul>
        <p>Click anywhere to close</p>
    </div>
</template>

<script>
export default {
    name: 'MarkdownHelp',
    props: {
        posX: Number,
        posY: Number
    },
    data() {
        return {
            height: 0,
            top: "200px",
            left: "200px"
        }
    },
    mounted() {
        this.height = this.$refs.md.clientHeight;
        this.top = this.posY - (this.height / 2) + "px";
        this.left = this.posX + "px";
        document.addEventListener('click', this.close);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close);
    },
    methods: {
        close() {
            this.$emit('close-md');
        }
    }
}
</script>

<style scoped>
    p, li {
        font-size: 0.75rem;
    }

    ul {
        list-style: none;
    }
    .md-box {
        display: block;
        position: absolute;
        white-space: nowrap;
        max-width: 350px;
        max-height: 400px;
        background-color: #f2fcff;
        border: 2px solid rgba(0, 0, 0, 0.25);
        padding: 1rem;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
    }
</style>

