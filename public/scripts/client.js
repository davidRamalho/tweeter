/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function () {
  
  //test tweet data 
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

  //takes in an object *tweet* and returns a tweet <article>  
  const createTweetElement = function (tweet) {
    const output = $(`<section id="tweets-container">
      <article class="tweet">
        <header class="tweet-header">
          <span><img src=${tweet.user.avatars}>${tweet.user.name}</span>
          <span id="handle">${tweet.user.handle}</span>
        </header>
        <section class="tweet-section">
          <p id="text">${tweet.content.text}</p>
        </section>
        <footer class="tweet-footer">
          <p>${tweet.created_at}</p>
          <div class="icons"><i class="fas fa-flag fa-xs"></i>
            <i class="far fa-retweet fa-xs"></i>
            <i class="far fa-heart fa-xs"></i></div>
        </footer>
      </article>
    </section>`);

    return output;
  }
  
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweets-container').prepend($tweet); 
   
});

