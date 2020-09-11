$(document).ready(function() {
  $('#new').on('click', function() {
    if ($('.new-tweet').hasClass('hidden')) {
      $('.new-tweet').slideDown().removeClass('hidden');
      $('#tweet-text').focus().select();
      $('.alert').slideUp();
    } else {
      $('.new-tweet').slideUp().addClass('hidden');
      $('.alert').slideUp();
    }
  });
});