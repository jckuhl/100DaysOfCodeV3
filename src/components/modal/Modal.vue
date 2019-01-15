<template>
    <div class="modal-bg" @click.self="close" ref="modal-bg">
        <div class="modal">
            <h3><slot name="header"></slot> <span @click="close"><small>Close</small> &times;</span></h3>
            <p><slot name="body"></slot></p>
            <div class="right">
                <button @click="action1"><slot name="btn1"></slot></button>
                <button @click="action2"><slot name="btn2"></slot></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        modal: {
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
        this.$refs['modal-bg'].style.top = window.scrollY + 'px';
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
    background: #c7effc;
    cursor: auto;
}

.stop-scrolling {
    width: 105%;
    height: 105%;
    overflow: hidden;
}

h3 {
    display: flex;
    justify-content: space-between;
    text-decoration: underline;
}

span {
    cursor: pointer;
}

.right {
    width: 100%;
    text-align: right;
}
</style>


