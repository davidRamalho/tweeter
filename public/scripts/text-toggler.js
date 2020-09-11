$(document).ready(function() {
  $('#new').on('click', function() {
    if ($('.new-tweet').hasClass('hidden')) {
      $('.new-tweet').removeClass('hidden');
      $('#tweet-text').focus().select();
    } else {
      $('.new-tweet').addClass('hidden');
    }
  });
});