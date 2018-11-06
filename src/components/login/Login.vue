<template>
    <div class="login">
        <h1 class="center">Welcome!</h1>
        <p class="center">Please log in with your username and password!</p>
        <form @submit="login">
        <p>
            <label for="username">Username:</label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Username or Email"
                v-model="inputUserName"
                v-bind:class="{ danger: userNameFailed }"
                required
            />
        </p>
        <p>
            <label for="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                v-model="inputPassword"
                v-bind:class="{ danger: passwordFailed }"
                required
            />
        </p>
        <p>
            <small><a href="#">Forgot username or password?</a></small>
        </p>
        <button type="submit" class="center" v-bind:disabled="!inputUserName || !inputPassword">Log In</button>
        </form>
        <p class="center">Or log in with Github!</p>
        <button class="center">Github</button>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: 'admin',  //testing only, these values come from Mongo
            password: 'password',    //testing only, these values come from Mongo
            inputUserName: '',
            inputPassword: '',
            userNameFailed: false,
            passwordFailed: false
        }
    },
    methods: {
        login() {
            event.preventDefault();
            //  TODO: draw from Mongo to get user name and password and see if they match the input
            if(this.inputUserName === this.username && this.inputPassword == this.password) {
                this.$router.push({ path: 'blog' });
                this.userNameFailed = false;
                this.passwordFailed = false;
            } else {
                if(this.inputUserName !== this.username) {
                    this.userNameFailed = true;
                } else {
                    this.userNameFailed = false;
                }
                if(this.inputPassword !== this.password) {
                    this.passwordFailed = true;
                } else {
                    this.passwordFailed = false;
                }
            }
        }
    }
}
</script>

<style scoped>

.login {
    margin: 1rem auto;
    padding: 1rem;
    width: 33%;
    border: 2px solid rgba(0, 0, 0, 0.25);
}

.center {
    margin: 1rem auto;
    text-align: center;
}

button {
    display: block;
}

.danger {
    border: 2px solid red;
}

</style>
