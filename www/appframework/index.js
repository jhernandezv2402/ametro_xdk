$(window).on('load', function(){
    var dir = "http://ametro.herokuapp.com"
    $('#enviar-reporte').on('click', function(){send()})
    $('#button-misreportes, #view-myreports').on('click', function(){m_reports()})
    $('#button-reportes, #view-reports').on('click', function(){reports()})
    $('#cerrarSesion').on('click', function(){cerrarSesion()})

    // aqui pretendo hacer mi funcion de envio
    function send(e) {
        var estacion = $('#estaciones').val()
        if (estacion === " " || estacion === "" || estacion === null || estacion === undefined) {
            return intel.xdk.notification.alert("Por favor, elige una estacion.", "Reporte", "Entendido")
        }
        var params = {
            "ubicacion": estacion,
            "linea": $('#lineas').val(),
            "user": getCookie("useramtr")
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: dir+"/ametro/reporte",
            data: JSON.stringify(params),
            beforeSend: function() {
                $('#mreports').html('<div id="afui_mask" class="ui-loader" style="z-index: 20000; display: block;"><span class="ui-icon ui-icon-loading spin"></span><h1>Loading Content</h1></div>')
            },
            success: function(message) {
                if (message.success) {
                    location.reload();
                    return intel.xdk.notification.alert("¡Registro Realizado!", "Reporte", "Entendido");
                }else{
                    return intel.xdk.notification.alert("Ya has realizado este reporte en la última hora","Reporte", "Entendido");
                }    
            },
            error: function(message) {
                return intel.xdk.notification.alert("Ya has realizado este reporte en la última hora");
            }
        })
    }
    $("select#lineas").change(function() {
        $('#estaciones').removeAttr('disabled')


        var uno = ['Pantitlán', 'Zaragoza', 'Gómez Farías', 'Balbuena', 'Moctezuma', 'San Lázaro', 'Candelaria', 'Merced', 'Pino Suárez', 'Isabel la Católica', 'Salto del Agua', 'Balderas', 'Cuauhtémoc', 'Insurgentes', 'Sevilla', 'Chapultepec', 'Juanacatlán', 'Tacubaya', 'Observatorio'],            
            dos = ['Cuatro caminos','Panteones', 'Tacuba','Cuitláhuac', 'Popotla', 'Colegio militar', 'Normal', 'San Cosme', 'Revolucion', 'Hidalgo', 'Bellas artes', 'Allende', 'Zocalo', 'Pino Suarez', 'San Antonio Abad', 'chabacano', 'Viaducto', 'Xola', 'Villa de Cortes', 'Nativitas', 'Portales', 'Ermita', 'General Anaya', 'Taxqueña'],
            tres = ['Indios Verdes', 'Deportivo 18 de Marzo', 'Potrero', 'La Raza', 'Tlatelolco', 'Guerrero', 'Hidalgo', 'Juarez', 'Balderas', 'Niños Heroes', 'Hospital General', 'Centro Medico', 'Etiopia', 'Eugenia', 'Division del Norte', 'Zapata', 'Coyoacan', 'Viveros', 'Miguel Angel de Quevedo', 'Copilco', 'Universidad'],
            cuatro = ['Martin Carrera', 'Talisman', 'Bondojito', 'Consulado', 'Canal del Norte', 'Morelos', 'Candelaria', 'Fray Servando', 'Jamaica', 'Santa Anita'],
            cinco = ['Pantitlan', 'Hangares', 'Terminal Aerea', 'Oceania', 'Aragon', 'Eduardo Molina', 'Consulado', 'Valle Gomez', 'Misterios', 'La Raza', 'Autobuses del Norte', 'Instituto del Petroleo', 'Politecnico'],
            seis = ['El Rosario', 'Tezozomoc', 'Azcapotzalco', 'Ferreria', 'Norte 45', 'Vallejo', 'Instituto del Petroleo', 'Lindavista', 'Deportivo 18 de Marzo', 'La Villa-Basilica', 'Martin Carrera'],
            siete = ['El Rosario', 'Aquiles Serdan', 'Camarones', 'Refineria', 'Tacuba', 'San Joaquin', 'Polanco', 'Auditorio', 'Constituyentes', 'Tacubaya', 'San Pedro de los Pinos', 'San Antonio', 'Mixcoac', 'Barranca del Muerto'],
            ocho = ['Garibaldi', 'Bellas Artes', 'San Juan de Letran', 'Salto del Agua', 'Doctores', 'Obrera', 'Chabacano', 'La Viga', 'Santa Anita', 'Coyuya', 'Iztacalco', 'Apatlaco', 'Aculco', 'Escuadron 201', 'Atlalilco', 'Iztapalapa', 'Cerro de la estrella',' UAM', 'Constitucion de 1917'],
            nueve = ['Pantitlan', 'Puebla', 'Ciudad Deportiva', 'Velodromo', 'Mixiuhca', 'Jamaica', 'Chabacano', 'Lazaro Cardenas', 'Centro Medico', 'Chilpancingo', 'Patriotismo', 'Tacubaya'],
            la = ['Pantitlan', 'Agricola Oriental', 'Canal de San Juan', 'Tepalcates', 'Guelatao', 'Peñon Viejo', 'Acatitla', 'Santa Marta', 'Los Reyes', 'La Paz'],
            lb = ['Buenavista', 'Guerrero', 'Garibaldi', 'Lagunilla', 'Tepito', 'Morelos', 'San Lazaro', 'Ricardo Flores Magon', 'Romero Rubio', 'Oceania', 'Deportivo Oceania', 'Bosque de Aragon', 'Villa de Aragon', 'Nezahualcoyotl', 'Impulsora', 'Rio de los Remedios', 'Muzquiz', 'Ecatepec', 'Olimpica', 'PLaza Aragon', 'Ciudad Azteca'],
            doce = ['Tlahuac', 'Tlaltenco', 'Zapotitlan', 'Nopalera', 'Olivos', 'Tezonco', 'Periferico Oriente', 'Calle 11', 'Lomas Estrellas', 'San Andres Tonatlan', 'Culhuacan', 'Atlalilco', 'Mexicaltzingo', 'Ermita', 'Eje Central', 'Parque de los Venados', 'Zapata', '20 de Noviembre', 'Insurgentes Sur', 'Mixcoac']                        
        var valor = $(this).val()
        $('option', $('#estaciones')).remove('option')
        if (valor == 1) {
            for (i = 0; i < uno.length; i++) {
                $('<option>' + uno[i] + '</option>').appendTo('#estaciones')
            }
        } else if (valor == 2) {
            for (i = 0; i < dos.length; i++) {
                $('<option>' + dos[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 3) {
            for (i = 0; i < tres.length; i++) {
                $('<option>' + tres[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 4) {
            for (i = 0; i < cuatro.length; i++) {
                $('<option>' + cuatro[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 5) {
            for (i = 0; i < cinco.length; i++) {
                $('<option>' + cinco[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 6) {
            for (i = 0; i < seis.length; i++) {
                $('<option>' + seis[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 7) {
            for (i = 0; i < siete.length; i++) {
                $('<option>' + siete[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 8) {
            for (i = 0; i < ocho.length; i++) {
                $('<option>' + ocho[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 9) {
            for (i = 0; i < nueve.length; i++) {
                $('<option>' + nueve[i] + '</option>').appendTo('#estaciones')
            }

        } else if (valor == "B") {
            for (i = 0; i < lb.length; i++) {
                $('<option>' + lb[i] + '</option>').appendTo('#estaciones')
            }

        } else if (valor == "A") {
            for (i = 0; i < la.length; i++) {
                $('<option>' + la[i] + '</option>').appendTo('#estaciones')
            }

        }  else if (valor == 12) {
            for (i = 0; i < doce.length; i++) {
                $('<option>' + doce[i] + '</option>').appendTo('#estaciones')
            }

        }  
    }).change();
    // Función de ver reportes
    function reports(e) {
        $.ajax({
            url: dir+'/ametro/users/reportes',
            contentType: "application/json",
            beforeSend: function() {
                $('#mreports').html('<div id="afui_mask" class="ui-loader" style="z-index: 20000; display: block;"><span class="ui-icon ui-icon-loading spin"></span><h1>Loading Content</h1></div>')
            },
            success: function(a) {
                $('#reports').empty()
                var data = JSON.parse(a)
                for (a = 0; a < data.reports.length; a++) {
                    $('<div />').html('<span>Reporte en:</span> <span>' + data.reports[a].ubicacion+'</span><br/><span>Linea:</span> <span>' + data.reports[a].linea+'</span><br/><span>Fecha:</span> <span>' + data.reports[a].date+'</span>').appendTo('#reports')
                    $('<br />').appendTo('#reports')
                }
                setTimeout(function(){reports()},5000)
            },
            error: function(data, dos, tres) {
                $('#reports').text('Error en el servidor')
            }
        })

    }
    function m_reports(e) {
        $.ajax({
            type: "GET",
            url: dir+'/ametro/reporte/' + getCookie("useramtr"),            
            contentType: "application/json",
            beforeSend: function() {
                $('#mreports').html('<div id="afui_mask" class="ui-loader" style="z-index: 20000; display: block;"><span class="ui-icon ui-icon-loading spin"></span><h1>Loading Content</h1></div>')
            },
            success: function(a) {
                $('#mreports').empty()
                var data = JSON.parse(a)
                for (a = 0; a < data.reports.length; a++) {
                    $('<p />').text('Reporte en: ' + data.reports[a].ubicacion).appendTo('#mreports')
                    $('<p />').text('Reportado el: ' + data.reports[a].date+'Usuario: '+ getCookie("useramtr")).appendTo('#mreports')                    
                }
            },
            error: function(data, dos, tres) {
                $('#mreports').text('Error en el servidor')
            }
        })
    }
    function cerrarSesion() {
        setCookie('user', null, -1)        
        window.location.href = "index.html"; 
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
})
