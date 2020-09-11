$(document).ready(function() {
  let length = 140; 
  const textArea = $('#tweet-text');
  const counter = $('#counter');

  counter.text(length); 

  textArea.on ('keyup', function () {
    const chars = $(this).val().length;
    counter.html(length - chars);

    if (length < chars) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  })
});