<template>
    <li @click="navigateTo">{{ status.title }}: {{ formattedDate }}</li>
</template>

<script>

import format from '../../../node_modules/date-fns/format';

export default {
    name: 'Contents',
    props: {
        status: Object
    },
    computed: {
        formattedDate() {
            return format(this.status.date, 'MM/DD/YYYY');
        }
    },
    methods: {
        navigateTo() {
            window.location.hash = this.status.id;
        }
    }
}
</script>

<style scoped>
    li {
        font-size: 0.75rem;
        list-style: disc;
        padding-left: 1rem;
        cursor: pointer;
    }

    li:hover {
        text-decoration: underline;
    }
</style>
