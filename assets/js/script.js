
$(document).ready(function () {

  $("button[type=submit]").on("click", function (event) {
    event.preventDefault();

    // Capturamos datos usuario y validamos que sea un número
    let eleccionUsuario;
    const numberValidator = /\d+/;
    let numeroValido = numberValidator.test($("input[type=text]").val());

    if (!numeroValido) {
      alert("No es un número válido")
    } else {
      eleccionUsuario = Number($("input[type=text]").val());
      alert("Tu valor es: " + eleccionUsuario)
      consultaAPI(eleccionUsuario);
    }
  });



  function consultaAPI(eleccionUsuario) {
    //Llamar API para consulta por id
    const apiKey = "8e375befdf5bf9850f1f6527a4e0e553";
    let id = eleccionUsuario;
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://superheroapi.com/api.php/" + apiKey + "/" + id,
      "method": "GET",
      "dataType": "json",
      "headers": {
        "Accept": "*/*",
      }
    };

    $.ajax(settings)
      .done(function (response) {
        //console.log(response);
        console.log(response.name)
        console.log(response.image.url)
        pintarCard(response)
      })
      .fail(function (response) {
        console.log(response)
        alert("No existe ID Heroe")
      });
  }


  function pintarCard(response) {

    $("#infocardHero").html(`
    
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
        </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Nombre: ${response.name}</h5>
          <p class="card-text">Genero: ${response.appearance.gender}</p>
          <p class="card-text">Alias: ${response.biography.aliases}</p>
          <p class="card-text">Ocupación: ${response.work.occupation}</p>
          <p class="card-text">Personajes relacionados: ${response.connections.relatives}</p>
        </div>
      </div>
      </div>
    </div>
    
    `);

  }


})