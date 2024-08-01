
$(document).ready(function () {

  //Escuchar evento click en button
  $("button[type=submit]").on("click", function (event) {
    event.preventDefault();

    // Capturamos datos usuario y validamos que sea un número
    let eleccionUsuario;
    const numberValidator = /\d+/;
    let numeroValido = numberValidator.test($("input[type=text]").val());

    //Valida si el número ingresado es un número y es mayor a 0
    if (!numeroValido || $("input[type=text]").val() == 0) {
      alert("No es un número válido, debe ser mayor a 0")
    } else {
      eleccionUsuario = Number($("input[type=text]").val());
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
        pintarCard(response);
        createChart(response);
      })
      .fail(function (response) {
        console.log(response)
        alert("No existe ID Heroe")
      });
  }

  //Función que se encarga de pintar data en formato card bootstrap
  function pintarCard(response) {

    $("#infocardHero").html(`   
    <h2>Ficha del héroe</h2>  
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
          <p class="card-text">Altura: ${response.appearance.height}</p>
          <p class="card-text">Peso: ${response.appearance.weight}</p>
          <p class="card-text">Ocupación: ${response.work.occupation}</p>
          <p class="card-text">Personajes relacionados: ${response.connections.relatives}</p>
        </div>
      </div>
      </div>
    </div>  
    `);
  }

  //Función crea chart
  function createChart(response) {

    let inteligencia = response.powerstats.intelligence
    if (inteligencia == "null") {
      inteligencia = 0
    }

    let fuerza = response.powerstats.strength
    if (fuerza == "null") {
      fuerza = 0
    }

    let velocidad = response.powerstats.speed
    if (velocidad == "null") {
      velocidad = 0
    }

    let durabilidad = response.powerstats.durability
    if (durabilidad == "null") {
      durabilidad = 0
    }

    let poder = response.powerstats.power
    if (poder == "null") {
      poder = 0
    }


    let combate = response.powerstats.combat
    if (combate == "null") {
      combate = 0
    }


    let options = {
      title: {
        text: "Estadisticas de poder para " + response.name
      },
      data: [{
        type: "pie",
        startAngle: 45,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y})",
        yValueFormatString: "#,##0.#" % "",
        dataPoints: [
          { label: "Inteligencia", y: Number(inteligencia) },
          { label: "Fuerza", y: Number(fuerza) },
          { label: "Velocidad", y: Number(velocidad) },
          { label: "Durabilidad", y: Number(durabilidad) },
          { label: "Poder", y: Number(poder) },
          { label: "Combate", y: Number(combate) }
        ]
      }]
    };
    $("#chartContainer").CanvasJSChart(options);
  }
})