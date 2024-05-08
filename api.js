const API_URL = 'https://epicorkinetic.nutrabiotics.co/e10pruebas/api/v2/efx/C01/APIALIVIA';

function sendRequest(endpoint, data) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener("load", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const response = JSON.parse(this.response);
          console.log(response); // Imprimir el resultado en la consola
          handleResponse(endpoint, response);
        } else {
          console.error('Error en la solicitud:', this.statusText);
        }
      }
    });
  
    xhr.open('POST', `${API_URL}/${endpoint}`);
    xhr.setRequestHeader('x-api-key', 'daJJpGNt9IvBlSLfpl0oxsWx1ngwcte8fit9lknG8Y9wA');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('JMEDINA:Nutra2023*#'));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  }

function handleResponse(endpoint, response) {
  const HTMLResponse = document.querySelector("#app");

  switch (endpoint) {
    case 'inventoryPart':
      renderInventoryPart(HTMLResponse, response);
      break;
    case 'otherEndpoint':
      // Agrega la lógica para renderizar la respuesta de otherEndpoint
      break;
    default:
      HTMLResponse.innerHTML = `<p>No se encontró el endpoint solicitado.</p>`;
  }
}

function renderInventoryPart(HTMLResponse, data) {
  const inventoryList = data.result.Inventory;
  const ul = document.createElement('ul');

  inventoryList.forEach(item => {
    const li = document.createElement('li');
    const content = `Producto: ${item.PartDesc},| -- |Planta: ${item.Plant},| -- |Cantidad: ${item.QtyOnHand}`;
    li.textContent = content;
    ul.appendChild(li);
  });

  HTMLResponse.innerHTML = ''; // Limpiar el contenido previo
  HTMLResponse.appendChild(ul); // Agregar la lista al elemento HTMLResponse
}

function inventoryPart() {
  if(this.readyState === 4 && this.status === 200) {
      const datacustomer = JSON.parse(this.response);
      //console.log(datacustomer);
      // Crear un nuevo elemento <p>
      const paragraph = document.createElement("p");
      
      // Asignar el contenido de dataorders al texto del párrafo
      paragraph.textContent = JSON.stringify(datacustomer.message);
      paragraph.textContent = JSON.stringify(datacustomer.result);

      // Obtener el elemento HTML donde deseas agregar el párrafo
      const HTMLResponse = document.querySelector("#app");

      // Agregar el párrafo al elemento HTML
      HTMLResponse.appendChild(paragraph);
  }
}