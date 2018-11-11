<template>
    <div class="modal-bg" @click.self="close">
        <div class="modal">
            <h3>{{ modal.title }} <span @click="close">&times;</span></h3>
            <p>{{ modal.message }}</p>
            <button @click="action1">{{ modal.btnAction1 }}</button>
            <button @click="action2">{{ modal.btnAction2 }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        modal: {
            title: String,
            message: String,
            btnAction1: String,
            btnAction2: String,
            action1: Function,
            action2: Function,
            data: Object
        }
    },
    methods: {
        close(event) {
            event.stopPropagation();
            this.$emit('close-modal');
        },
        action1(args) {
            const action = this.modal.action1.bind(this, args);
            action();
        },
        action2(args) {
            const action = this.modal.action2.bind(this, args);
            action();
        }
    },
    mounted() {
        document.querySelector('body').classList.add('stop-scrolling');
    }
}
</script>

<style scoped>
    
.modal-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
}

.modal {
    text-align: center;
    max-width: 33%;
    max-height: 65%;
    margin: 0 auto;
    margin-top: 15%;
    padding: 1rem;
    border-radius: 10px;
    border: 3px solid black;
    background: #c7effc
}

.stop-scrolling {
    height: 100%;
    overflow: hidden;
}
</style>


