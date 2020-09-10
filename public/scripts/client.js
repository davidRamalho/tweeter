/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function () {
  
  //takes in an object *tweet* and returns a tweet <article>  
  const createTweetElement = function (tweet) {
    let output = $(`<section id="tweets-container">
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
  
  //takes in an array of objects and appends each one to the #tweets-container
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }
  
  //Fetches the tweets stored in /tweets 
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  };
  

  //Submits a POST request with the new-tweet information to the server and upon success calls the loadTweets function.
  const $postTweet = $('#form');
  $postTweet.on('submit', function (event) {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      alert('My little lungs can only tweet so much! 🐦');
    } else if ( $('#tweet-text').val().length === 0) {
      alert('A tweet cannot be empty 🐦');
    } else {
      const serializedData = $(this).serialize();
      $.post('/tweets', serializedData)
      .then((response) => {
        loadTweets();
        $('#tweet-text').val(''); 
        $('.counter').val(140);
      })
    }
    
  });
  
  

});

