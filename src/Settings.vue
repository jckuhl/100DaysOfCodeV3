<template>
    <div class="text-container">
        <h1>Settings</h1>
        <p v-for="([key, value], index) of Object.entries(editUser)" :key="index">
            <label :for="key">{{ key | title }}: </label>
            <input type="text" :name="key" :id="key" v-model="editUser[key]" :placeholder="value">
        </p>
        <button @click="save">Save</button>
        <button>Cancel</button>
        <h3>Privacy</h3>
        <p>As a default, this site is a private log for you.  However, you may opt in to share your experience with fellow coders.</p>
        <p>
            <input type="checkbox" v-model="user.options.sharing" id="sharing"> 
            <label for="sharing">Share your experience with other coders!</label>
        </p>
        <p>
            <input type="checkbox" v-model="user.options.comments" id="enable-comments">
            <label for="enable-comments">Enable comments</label>
        </p>
        <p>If you would like to delete your account you may do so by clicking the button below.  Be warned, this action is non reversable and all your data will be lost.</p>
        <button>Deactivate Account</button>
        <modal :modal="modal" v-if="modalOpen"/>
    </div>
</template>

<script>
import Modal from './components/modal/Modal';
import User from './models/user.js';
import httpUtils from './server/httpUtils.js';

export default {
    name: 'Settings',
    components: {
        Modal
    },
    data() {
        return {
            user: {},
            editUser: {},
            modal: {
                title: 'Account Deactivation',
                message:  'This will permanently delete your account and all of your posts.'
                    + 'This cannot be undone.  Are you sure you want to do this?',
                btnAction1: 'Yes',
                btnAction2: 'No'
            },
            modalOpen: false
        }
    },
    methods: {
        edit(event, field, value) {
            this.editUser[field] = value;
        },
        save() {
            let updatedUser = Object.assign(this.user, this.editUser);
            let url = httpUtils.setURIString({ params: [this.user.id]});
            console.log(updatedUser);
        }
    },
    created() {
        this.user = new User({
            name: 'Bob',
            username: 'bubbagump123',
            password: '1234',
            email: 'deededee@deedee.net',
            github: 'something.git'
        });

        // make a copy
        this.editUser = { 
            name: this.user.name,
            username: this.user.username,
            password: this.user.password,
            email: this.user.email
        };
    }
}
</script>

<style scoped>

</style>
