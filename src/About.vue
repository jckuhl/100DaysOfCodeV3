<template>
    <div class="text-container">
        <h1>About</h1>
        <p>The 100 Days of Code challenge is a discipline challenge.  It demands that you code, for at least one hour a day for 100 days.  In that time you will learn a lot.  This website is meant to be a personal log, for you, to keep yourself accountable.  To get started, click on "New Round" and start writing.</p>
        <p>Each round lasts 100 days.  The website will allow you to continue to post in an expired round, just in case you want to post about something the day after it expired about some activity you did before it expired,but the official rules do state to start a new round after 100 days.  You can start a new Round any time you please, there's no requirement to finish around before moving on to the next.  This website won't enforce the official rules.</p>
        <p>Your log is fully Markdown supported.  Any Markdown is valid.  You may have links and images (they must be hosted somewhere, such as Imgur or Photobucket.)  Each post can also be tweeted, but be careful as tweets can only contain 280 characters, and the tweet will include the #100DaysOfCode hash tag (as per the official rules)</p>
        <h2>Markdown Syntax</h2>
        <p>This project is an open source project, and the code can be found on <a href="https://github.com/jckuhl/100DaysOfCodeV3">Github.</a>  Please note, that the appropriate repo is "V3" due to migrating to Vue CLI 3.  This project's stack is Mongo, Express, Vue and Node.</p>
    </div>
</template>

<script>
export default {
    name: 'about'
}
</script>