$(function(){

  $('#denglu').on('click',function(){
    $('.denglu_box').hide()
    $('.zhuce_box').show()
  })

  $('#zhuce').on('click',function(){
    $('.denglu_box').show()
    $('.zhuce_box').hide()
  })


  var form = layui.form
  var layer =layui.layer
  form.verify({
    psw: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repsw:function(value){
      var a2 = $('#a1').val()
      if(a2 !== value){
        return "二次密码不一致"
      }
    } 

  })

  $('#form-reg').on('submit', function (e) {
      e.preventDefault();
      $.post('/api/reg',
        $(this).serialize(),
        function (res) {
          if (res.code !== 0) {
            return layer.msg(res.message);
          }
         layer.msg('注册成功 请登录！');
          $('#zhuce').click();
        }
      )
    })



  $('#form_login').submit(function(e){
    e.preventDefault();
    $.ajax({
      url:'/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.code !==0){
          return layer.msg('登录失败')
        }
        layer.msg('登录成功');
        localStorage.setItem('token',res.token)
        // console.log(res.token);
        location.href='../../index.html'
        
      }
    })
  })
  
})