<template>
    <li>{{ contentTitle }}: {{ formattedDate }}</li>
</template>

<script>

import format from '../../../node_modules/date-fns/format';

export default {
    name: 'Contents',
    props: {
        contentTitle: String,
        contentDate: Date
    },
    computed: {
        formattedDate() {
            return format(this.contentDate, 'MM/DD/YYYY');
        }
    }
}
</script>

<style scoped>
    li {
        font-size: 0.75rem;
        list-style: disc;
        padding-left: 1rem;
    }
</style>
