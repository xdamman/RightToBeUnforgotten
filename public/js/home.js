$('#toggle li').on('click', function() {
  $('#toggle button').html($(this).find('a').html());
});
