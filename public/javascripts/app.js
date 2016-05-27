$(function(){
  $('.fa-plus-circle').on('click', function(e){
    e.preventDefault();
    var data = {}
    data.user_id = $('.profile_id').text();
    data.intention = $(this).prevAll('.advicetext').text();
    data.create = Date.now();
    data.createFormatted = moment().format('MMMM Do, h:mm a');
    $.ajax({
      type:"POST",
      cache:false,
      url:"/list/add",
      data:data,
      success: function (html) {
        console.log('successful post');
        console.log(e);
        $(e.target).prev('.addthis').fadeIn(500).css({'display':'inline-block'});
        setTimeout(function(){
        $(e.target).prev('.addthis').fadeOut(500);
        }, 2000);
      }
    });
    return false;
  })

  $('.start').on('click', function(e){
    e.preventDefault();
    var data = {}
    data.start = Date.now();
    data.startFormatted = moment().format('MMMM Do, h:mm a');
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
    data.end = Date.now();
    data.endFormatted = moment().format('MMMM Do, h:mm a');
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

  $('.ancestrypath').on('mouseover', function(){
    $(this).next().show()
  })
  $('.ancestrypath').on('mouseleave', function(){
    $(this).next().hide()
  })
})
