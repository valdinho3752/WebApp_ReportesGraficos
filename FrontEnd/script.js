document.getElementById('csvFileInput').addEventListener('change', function(e) {
  var file = e.target.files[0];

  var formData = new FormData();
  formData.append('csvFile', file);

  fetch('http://127.0.0.1:8000/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(datos => {
      if(datos != null){
        console.log("ARCHIVO ENVIADO")
      }
      
    });

  fetch('http://127.0.0.1:8000/graph/info')
    .then(response => response.json())
    .then(data => {
      // Manejar los datos recibidos
      var selectColumnas = document.getElementById("columnas1");
      for (var i = 0; i < data.columnas.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = data.columnas[i];
        opcion.textContent = data.columnas[i];
        selectColumnas.appendChild(opcion);
        }
      //document.body.appendChild(selectColumnas);

      var selectColumnas = document.getElementById("columnas2");
      for (var i = 0; i < data.columnas.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = data.columnas[i];
        opcion.textContent = data.columnas[i];
        selectColumnas.appendChild(opcion);
        }
      //document.body.appendChild(selectColumnas);

      var selectEstilos = document.getElementById("estilos")
      for (var i = 0; i < data.graph_styles.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = data.graph_styles[i];
        opcion.textContent = data.graph_styles[i];
        selectEstilos.appendChild(opcion);
        }
      //document.body.appendChild(selectEstilos);
    });
  document.getElementById("btnGenerar").addEventListener("click", function(){
    var selectColumnas1 = document.getElementById("columnas1")
    var selectColumnas2 = document.getElementById("columnas2")
    var selectEstilos = document.getElementById("estilos")
    
    var columnaSeleccionada1 = selectColumnas1.options[selectColumnas1.selectedIndex].text
    var columnaSeleccionada2 = selectColumnas2.options[selectColumnas2.selectedIndex].text
    var estiloSeleccionado = selectEstilos.options[selectEstilos.selectedIndex].text
    //console.log(columnaSeleccionada, estiloSeleccionado)

    var data = {
      columna1: columnaSeleccionada1,
      columna2: columnaSeleccionada2,
      estilo: estiloSeleccionado
    };

    fetch('http://127.0.0.1:8000/columna/estilo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(datos => {
        if(datos != null){
          console.log("DATOS ENVIADOS")
        }
      });

    fetch('http://127.0.0.1:8000/image')
      .then(response => response.blob())
      .then(blob => {
        // Crear una URL de objeto para la imagen
        const imageUrl = URL.createObjectURL(blob);
        
        // Crear un elemento de imagen y establecer la URL
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;

        // Agregar la imagen al documento HTML
        document.body.appendChild(imgElement);
      })
      .catch(error => {
        // Manejar errores
        console.error('Error:', error);
      });


  })
  
  
  
  /*
  var reader = new FileReader();

  reader.onload = function(e) {
    var contents = e.target.result;
    var lines = contents.split('\n');

    var table = document.createElement('table');

    for (var i = 0; i < lines.length; i++) {
      var cells = lines[i].split(',');
      var row = document.createElement('tr');

      for (var j = 0; j < cells.length; j++) {
        var cell = document.createElement(i === 0 ? 'th' : 'td');
        cell.textContent = cells[j];
        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    document.getElementById('csvData').innerHTML = '';
    document.getElementById('csvData').appendChild(table);
  };

  reader.readAsText(file);*/
});
