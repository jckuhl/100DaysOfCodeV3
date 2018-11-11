<template>
    <div id="app">
        <Header :username="'bob'" />
        <router-view />
    </div>
</template>

<script>
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/mainbody/Main';

export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

html, body {
  background-color: #c7effc;
  padding: 0;
  margin: 0;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.main {
  width: 80%;
}

.sidebar {
  width: 20%;
  border-right: 2px solid rgba(0, 0, 0, 0.25);
}

.border-bottom {
  border-bottom: 2px solid rgba(0, 0, 0, 0.25);
}

.border-left {
  border-left: 2px solid rgba(0, 0, 0, 0.25);
}

.border-right {
  border-right: 2px solid rgba(0, 0, 0, 0.25);
}

.component-padding {
  padding: 1rem;
}

button {
    font-size: 1rem;
    color: white;
    background: darkcyan;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    margin: 5px;
}

button:hover {
    font-size: 1.05rem;
}

button:disabled {
    background: lightgray;
}

/* for divs that contain only paragraph text */
.text-container {
    padding: 1rem;
}

</style>
