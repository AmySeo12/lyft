var cargarPagina= function(){
	$("#telefono").keydown(validarNumeros);
	$("#telefono").keyup(validarLongitud);
	$("#siguiente").click(generarCódigo);
	$("#registrarCodigo").click(registrarCodigo);
	$(".codigo-r").keyup(focus);
	$(".codigo-r").keypress(validar);
	$(".codigo-r").keydown(validarNumeros);
	$(".codigo-r").first().focus();
	$("#numero").text(numero);
	$("#registro").click(registrar);
	$("#nombres").keyup(mayuscula);
	$("#apellidos").keyup(mayuscula);
	
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}
}

$(document).ready(cargarPagina);
var codigoAleartorio = localStorage.getItem("codigo");
var numero= localStorage.getItem("numeroTelefono");
var nombre= localStorage.getItem("nombre");
var apellido= localStorage.getItem("apellido");
var correo= localStorage.getItem("correo");

var validarNumeros= function(e){
	var codigo = e.keyCode;
	if (codigo == 8 || (codigo >= 48 && codigo <= 57)) {
		return true;
	} else {
		return false;
	}
}

var validarLongitud= function(){
	var longitud = $(this).val().length;
	if (longitud == 9) {
		$("#siguiente").attr("href", "codigo.html");
	} else {
		$("#siguiente").removeAttr("href");
	}
}

var generarCódigo= function(){
	if (codigoAleartorio !== null) {
		localStorage.removeItem("codigo");
	}
	if ($("#telefono").val().length == 9){
		numero= $("#telefono").val();
		codigoAleartorio= Math.floor(Math.random()*900)+100;
		localStorage.setItem("codigo", codigoAleartorio);
		alert("su código es: LAB-"+ codigoAleartorio);
		localStorage.setItem("numeroTelefono", numero);
	}
}

var registrarCodigo= function(){
	var codigoConfirmacion= $("#codigo1").val() + $("#codigo2").val() + $("#codigo3").val();
	if (codigoAleartorio !== null) {
		if(codigoAleartorio == codigoConfirmacion){
			$("#registrarCodigo").attr("href", "datos.html");
		}else{
			alert("Ingrese su código");
			$(".codigo").last().focus();
		}
	} else {
		alert("Genera tu código");
	}
}

var focus= function(e){
	var codigo = e.keyCode;
	if(codigo >= 48 && codigo <= 57){
		$(this).next().focus();
		return true;
	}else if(codigo == 8){
		$(this).prev().focus();
		return true;
	}else{
		return false;
	}
}

var validar= function(e){
	if($(this).val().length== 0){
		return true;
	}else{
		return false;
	}
}

var registrar= function(){
	nombre= localStorage.setItem("nombre", $("#nombres").val());
	apellido= localStorage.setItem("apellido", $("#apellidos").val());
	correo= localStorage.setItem("correo", $("#correo").val());

	if((nombres() && email()) && $("#check").is(":checked")){
		$("#registro").attr("href", "mapa.html");
		alert("Funciona");
	}
}

var mayuscula= function(){
	if($(this).val().length > 0){
		$(this).addClass("mayuscula");
	} else{
		$(this).removeClass("mayuscula");
	}
}

var nombres= function(){
	var letra = /^[a-zA-Z]+$/;
	if(($("#nombres, #apellidos").val().length >= 2 && $("#nombres, #apellidos").val().length <= 20) && letra.test($("#nombres, #apellidos").val().trim())){
		return true;
	}else{
		return false;
	}
}

var email= function(){
	var regex= /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	if(regex.test($("#correo").val().trim())){
		return true;
	}else{
		return false;
	}
}


var funcionExito = function(posicion) {
	var lat = posicion.coords.latitude;
    var lon = posicion.coords.longitude;

    var mapa = new GMaps({
	  div: '#mapa',
	  lat: lat,
	  lng: lon
	});

	mapa.addMarker({
		lat: lat,
		lng: lon,
		title: 'Lima',
		click: function(e) {
		alert('You clicked in this marker');
		}
	});
};

var funcionError = function (error) {
	console.log(error);
};