$(function(){
  $('.fa-plus-circle').on('click', function(e){
    e.preventDefault();
    var data = {}
    data.user_id = $('.profile_id').text();
    data.intention = $(this).prev().text();
    data.date = new Date();
    $.ajax({
      type:"POST",
      cache:false,
      url:"/list/add",
      data:data,
      success: function (html) {
        console.log('successful post');
      }
    });
    return false;
  })

  $('.fa-check-circle').on('click', function(e){
    e.preventDefault();
    var data = {}
    data.end = new Date();
    data.intention = $(this).prev().text();
    $.ajax({
      type:"POST",
      cache:false,
      url:"/list/update",
      data:data,
      success: function (html) {
        console.log('successful post');
      }
    });
    return false;
  })
})
