$(window).on('load', function(){
    var dir = "http://ametro.herokuapp.com"
    $('#registrar').on('click', function(){send()})
    $('#login').on('click', function(){login()})

    function send(e) {
        var passok =$('#passok').val(),
            params = {
                nombre: $('#nombre').val(),
                email: $('#email_login').val(),
                password: $('#password_login').val()  
            }
        if(params.nombre == ""|| params.nombre == null||params.email == ""|| params.email == null||params.password == ""|| params.password == null){
            return intel.xdk.notification.alert("Ingresa todos tus datos", "Registro", "Entendido");
        }else if (params.password != passok) {
            return intel.xdk.notification.alert("Las constraseñas no coinciden", "Registro", "Entendido");
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: dir+"/ametro/user",
            data: JSON.stringify(params),
            beforeSend: function() {
                $('#mreports').html('<div id="afui_mask" class="ui-loader" style="z-index: 20000; display: block;"><span class="ui-icon ui-icon-loading spin"></span><h1>Loading Content</h1></div>')
            },
            success: function(message) {
                intel.xdk.notification.alert("Registro exitoso, inicia sesión por favor", "Hecho", "Entendido");
                return window.location.href = "index.html";
            },
            error: function(message) {
                return intel.xdk.notification.alert("Erro en el servidor", "Error", "Entendido");
            }
        })
    }
    function login(e) {
        var params = {
                email: $('#email').val(),
                password: $('#password').val()  
            }
        if(params.email == ""|| params.email == null||params.password == ""|| params.password == null){
            return intel.xdk.notification.alert("Ingresa todos los campos", "Ups!", "Entendido");
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: dir+"/ametro/login",       
            data: JSON.stringify(params),
            beforeSend: function() {
                $('#mreports').html('<div id="afui_mask" class="ui-loader" style="z-index: 20000; display: block;"><span class="ui-icon ui-icon-loading spin"></span><h1>Loading Content</h1></div>')
            },
            success: function(message) {
                if(message.success){
                    var usr = message.user.email;
                    setCookie("useramtr", usr, 25);                
                    window.location.href = "index_reports.html";
                }else if(!message.succes){
                    return intel.xdk.notification.alert("correo y/o password incorrectos", "Ups!", "Entendido");
                }
            },
            error: function(message) {
                return intel.xdk.notification.alert("correo y/o password incorrectos", "Ups", "Entendido");
            }
        })
    }
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }
    function checkCookie(e) {
        var username=getCookie("useramtr");
        if (username) {            
            return username;
        }else{
            return false;
        }
    }
})
