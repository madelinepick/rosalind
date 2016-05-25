$(function(){
  $('.fa-plus-circle').on('click', function(e){
    e.preventDefault();
    var data = {}
    data.user_id = $('.profile_id').text();
    data.intention = $(this).prev().text();
    data.create = new Date();
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

  $('.start').on('click', function(e){
    e.preventDefault();
    var data = {}
    data.start = new Date();
    data.intention = $(this).prev('.intention').text();
    $.ajax({
      type:"POST",
      cache:false,
      url:"/list/start",
      data:data,
      success: function (html) {
        $('.overlaystart').css({'display':'flex'});
      }
    })
    return false;
  })

  $('.complete').on('click', function(e){
    e.preventDefault();
    var data = {}
    data.end = new Date();
    data.intention = $(this).prev('.intention').text();
    $.ajax({
      type:"POST",
      cache:false,
      url:"/list/complete",
      data:data,
      success: function (html) {
        $('.overlaycomplete').css({'display':'flex'});
      }
    })
    return false;
  })

  $('.close').on('click', function(e){
    location.reload();
  })
})
