var cargarPagina= function(){
	$("#telefono").keydown(validarNumeros);
	$("#telefono").keyup(validarLongitud);
	$("#siguiente").click(generarCódigo);
	$("#registrarCodigo").click(registrarCodigo);
}

$(document).ready(cargarPagina);
var codigoAleartorio = localStorage.getItem("codigo");

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
		codigoAleartorio= Math.floor(Math.random()*900)+100;
		localStorage.setItem("codigo", codigoAleartorio);
		alert("su código es: LAB-"+ codigoAleartorio);
	}
}

var registrarCodigo= function(){
	if (codigoAleartorio !== null) {
		if(codigoAleartorio == $("#codigo").val()){
			$("#registrarCodigo").attr("href", "datos.html");
		}else{
			alert("Ingrese su código");
		}
	} else {
		alert("Genera tu código");
	}
}