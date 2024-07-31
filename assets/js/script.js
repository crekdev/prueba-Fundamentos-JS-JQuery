
// Capturamos datos usuario y validamos que sea un número
let eleccionUsuario;
$("button[type=submit]").on("click", function (event) {
  event.preventDefault();

  const numberValidator = /\d+/;
  let numeroValido = numberValidator.test($("input[type=text]").val());

  if (!numeroValido) {
    alert("No es un número válido")
  } else {
    eleccionUsuario = $("input[type=text]").val();
    alert("Tu valor es: " + eleccionUsuario)
  }
});
