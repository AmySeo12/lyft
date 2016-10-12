var cargarPagina= function(){
	$("#telefono").keydown(validarNumeros);
	$("#telefono").keyup(validarLongitud);
	$("#siguiente").click(generarCódigo);
	$("#registrarCodigo").click(registrarCodigo);
	$(".codigo").keyup(focus);
	$(".codigo").keypress(validar);
	$(".codigo").keydown(validarNumeros);

	$(".codigo").first().focus();
}

$(document).ready(cargarPagina);
var codigoAleartorio = localStorage.getItem("codigo");
var numero= localStorage.getItem("numeroTelefono");

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