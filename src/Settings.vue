<template>
    <div class="text-container">
        <h1>Settings</h1>
        <p v-for="([key, value], index) of Object.entries(editUser)" :key="index">
            <label :for="key">{{ key | title }}: </label>
            <input type="text" :name="key" :id="key" v-model="editUser[key]" :placeholder="value">
        </p>
        <button @click="save">Save</button>
        <button>Cancel</button>
    </div>
</template>

<script>
import User from './models/user.js';
import httpUtils from './server/httpUtils.js';

export default {
    name: 'Settings',
    data() {
        return {
            user: {},
            editUser: {},
            updates: []
        }
    },
    methods: {
        edit(event, field, value) {
            this.editUser[field] = value;
        },
        save() {
            const user = Object.assign({}, this.user, this.editUser);
            let url = httpUtils.setURIString({ params: this.updates.concat(this.editUser.id)});
            console.log(user);
        }
    },
    created() {
        this.user = new User({
            name: 'Bob',
            username: 'bubbagump123',
            password: '1234',
            email: 'deededee@deedee.net',
            github: null
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
