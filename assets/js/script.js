
$(document).ready(function () {

  //Escuchar evento click en button
  $("button[type=submit]").on("click", function (event) {
    event.preventDefault();

    // Capturamos datos usuario y validamos que sea un número
    let eleccionUsuario;
    const numberValidator = /\d+/;
    let numeroValido = numberValidator.test($("input[type=text]").val());

    //Valida si el número ingresado es un número y es mayor a 0
    if (!numeroValido || $("input[type=text]").val() <= 0 || $("input[type=text]").val() >= 732) {
      alert("No es un número válido, debe ser mayor a 0 y menor a 732")
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
          <img src="${response.image.url}" class="img-fluid rounded-start" alt="Imagen de Héroe">
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

    for (const property in response.powerstats) {
      //Se valida si alguna variable es "null" se convierta a 0 para no romper gráfico
      if (response.powerstats[property] == "null") {
        response.powerstats[property] = 0;
      }
    }

    //Se declaran variables eje y
    let inteligencia = response.powerstats.intelligence
    let fuerza = response.powerstats.strength
    let velocidad = response.powerstats.speed
    let durabilidad = response.powerstats.durability
    let poder = response.powerstats.power
    let combate = response.powerstats.combat

    //Se valida que si todas las variables son "null" se muestre alerta
    if (inteligencia == "null" && fuerza == "null" && velocidad == "null" && durabilidad == "null" && poder == "null" && combate == "null") {
      alert("Héroe no posee Estadisticas de poder");
    }


    //Se crea gráfico
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