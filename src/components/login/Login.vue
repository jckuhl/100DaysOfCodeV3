<template>
    <div class="login">
        <h1 class="center">Welcome!</h1>
        <p class="center">Please log in with your username and password!</p>
        <form @submit="login">
            <p>Don't have an account? Click <a href="javascript:;" @click="changeMode">here</a> to register!</p>
            <h3 v-if="mode==='register'">Register</h3>
            <h3 v-else>Login</h3>
            <p v-if="mode==='register'">
                <label for="name">Your name (optional):</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    placeholder="Your name"
                    v-model="inputUser.name"
                />
            </p>
            <p>
                <label for="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    autocomplete="username"
                    placeholder="Username or Email"
                    v-model="inputUser.username"
                    :class="{ danger: userNameFailed }"
                    required
                />
            </p>
            <p>
                <label for="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="current-password"
                    v-model="inputUser.password"
                    :class="{ danger: passwordFailed }"
                    required
                />
            </p>
            <p v-if="mode==='register'">
                <label for="confirmPassword">Confirm Password</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword"
                    v-model="inputUser.confirmPassword"
                    required
                />
            </p>
            <p>
                <small><a href="#">Forgot username or password?</a></small>
            </p>
            <button type="submit" class="center" :disabled="!inputUser.username || !inputUser.password">Log In</button>
            <p v-if="error.message">{{ error.status }}: {{ errorMessage }}</p>
        </form>
        <p class="center">Or log in with Github!</p>
        <button class="center">Github</button>
        <h4>Privacy Notice:</h4>
        <p>Your email will not be used for any purpose other than for verification and password resets.</p>
    </div>
</template>

<script>
import httpUtils from '../../server/httpUtils';

export default {
    name: 'Login',
    data() {
        return {
            username: 'admin',  //testing only, these values come from Mongo
            password: 'password',    //testing only, these values come from Mongo
            inputUser: {
                name: '',
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            userNameFailed: false,
            passwordFailed: false,
            mode: 'login',
            error: {
                message: '',
                status: null
            }
        }
    },
    computed: {
        errorMessage() {
            const status = {
                '401': 'Please check your username and password',
                '404': 'Account not found, have you registered?',
                '500': 'Something went wrong with the server, please try again later',
                'Failed to fetch': 'Servers are currently down, please try again later'
            }
            return status[this.error.status];
        }
    },
    methods: {
        async login(event) {
            event.preventDefault();
            //  TODO: draw from Mongo to get user name and password and see if they match the input
            let url = httpUtils.setURIString({ params: ['login']})
            try {
                const user = await fetch(url).then(response => {
                    if(response.ok) {

                    } else {
                        throw new Error(`${response.status}: ${response.statusText}`);
                    }
                });
                this.$router.push({ path: 'blog' });
            } catch(error) {
                console.error(error);
                this.error.message = error.message;
                this.error.status = error.message.split(':')[0];
            }
        },
        register(event) {
            event.preventDefault();
        },
        changeMode() {
            this.mode = this.mode === 'register' ? 'login' : 'register';
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