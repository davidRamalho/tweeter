/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function () {
  // converts the timestamp into a time since format
  const timeSince = function(date) {
    date = new Date(date);
    
    const seconds = Math.floor((new Date() - date) / 1000);
    let intervalType;
  
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
  
    if (interval > 1 || interval === 0) {
      intervalType += 's';
    }
  
    return interval + ' ' + intervalType;
  };

  //escapes unsafe characters
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //takes in an object *tweet* and returns a tweet <article>  
  const createTweetElement = function (tweet) {
    let output = $(`<section id="tweets-container">
      <article class="tweet">
        <header class="tweet-header">
          <span><img src=${tweet.user.avatars}>${escape(tweet.user.name)}</span>
          <span id="handle">${escape(tweet.user.handle)}</span>
        </header>
        <section class="tweet-section">
          <div id="text">${escape(tweet.content.text)}</div>
        </section>
        <footer class="tweet-footer">
          <p>${timeSince(tweet.created_at)} ago</p>
          <div class="icons"><i class="fas fa-flag fa-xs"></i>
            <i class="far fa-retweet fa-xs"></i>
            <i class="far fa-heart fa-xs"></i></div>
        </footer>
      </article>
    </section>`);

    return output;
  }

  //Displays Error Message
  const createErrorMessage = function (str) {
    `<div id="error"></div>`
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

