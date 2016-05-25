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
})
