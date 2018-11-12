<template>
    <div class="text-container">
        <h1>Resources</h1>
        <p>Here are a number of resources that may help you on your journey.  If you come across anything else you find interesting, add it to the list!  Be sure to tweet about it too so others will be aware!</p>
        <resource-post :resource="freecodecamp" :custom="false" />
        <h3>Add your own!</h3>
        <p>
            <label for="title">Title: </label>
            <input type="text" name="title" id="title" v-model="newResource.title">
        </p>
        <p>
            <label for="ur">URL: </label>
            <input type="text" name="url" id="url" v-model="newResource.url">
        </p>
        <p>
            <label for="blurb">About</label>
            <textarea name="blurb" 
                id="blurb" 
                cols="30" 
                rows="10" 
                placeholder="Write a blurb about it!"
                v-model="newResource.blurb">
            </textarea>
        </p>
        <p>
            <button @click="submitNewResource">Submit</button>
        </p>
        <resource-post v-for="resource in resources" 
            :key="resource.id"
            :resource="resource"
            :custom="true"
            @delete-resource="deleteResource($event)"
        />
    </div>
</template>

<script>
import ResourcePost from './ResourcePost';
import Modal from './../modal/Modal';
import Resource from './../../models/resource.js';
import Utilities from './../../models/utilities.js';
import httpUtils from './../../server/httpUtils.js';

const { getHash, isNotValidSessionObject } = Utilities;

export default {
    name: 'Resources',
    components: {
        ResourcePost,
        Modal
    },
    data() {
        return {
            resources: [],
            freecodecamp: {
                title: 'Free Code Camp',
                blurb: 'Free Code Camp info',
                url: 'https://freecodecamp.org'
            },
            modal: {

            },
            newResource: {
                title: '',
                blurb: '',
                url: ''
            },
            hashBin: new Set(),
            setPostOptions: null
        }
    },
    methods: {
        submitNewResource(event) {
            event.preventDefault();
            const resource = new Resource({ 
                ...this.newResource,
                id: getHash(this.hashBin)
            });
            this.resources.unshift(resource)
            let url = httpUtils.setURIString({ params: ['newresource'] });
            let options = this.setPostOptions(resource);
            fetch(url, options);
            this.newResource = {
                title: '',
                blurb: '',
                url: '',
                id: '',
            }
        },
        deleteResource(id) {
            this.resources = this.resources.filter(resource => resource.id !== id);
            let url = httpUtils.setURIString({ params: ['deleteresource', id]});
            fetch(url, { method: 'DELETE'})
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }
    },
    async created() {
        const populateResources = resource => new Resource({
            title: resource.title,
            url: resource.url,
            blurb: resource.blurb,
            id: resource.id
        });

        // grab the resources from either session storage or mongo
        let resources = sessionStorage.getItem('resources');
        if(isNotValidSessionObject(resources)) {
            let url = httpUtils.setURIString({ params: ['resources']});
            resources = await httpUtils.ajax(url);
            this.resources = resources.map(populateResources);
        }
        sessionStorage.setItem('resources', JSON.stringify(this.resources));

        // set up setPostOptions
        this.setPostOptions = httpUtils.createHeader({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }
}
</script>