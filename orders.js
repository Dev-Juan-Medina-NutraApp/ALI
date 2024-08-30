const API_URL = 'https://epicorkinetic.nutrabiotics.co/e10pruebas/api/v2/efx/C01/API-ALIVIA';
let orderNum;

// Obtener referencias a los elementos
const checkbox1 = document.getElementById('checkbox1');
const input1 = document.getElementById('Cant1');
// Agregar un evento de cambio al checkbox
checkbox1.addEventListener('change', function() {
  // Activar o desactivar el campo de entrada según el estado del checkbox
  input1.disabled = !this.checked;
});
const checkbox2 = document.getElementById('checkbox2');
const input2 = document.getElementById('Cant2');
checkbox2.addEventListener('change', function() {
input2.disabled = !this.checked;
});
const checkbox3 = document.getElementById('checkbox3');
const input3 = document.getElementById('Cant3');
checkbox3.addEventListener('change', function() {
  input3.disabled = !this.checked;
});

// ============================================================
// =================== RESPUESTA Orders =======================
// ============================================================
function CreateOrders() {
    if(this.readyState === 4 && this.status === 200) {
        const dataorders = JSON.parse(this.response);
        console.log(dataorders);
        // Crear un nuevo elemento <p>
        const paragraph = document.createElement("p");
        
        // Asignar el contenido de dataorders al texto del párrafo
        paragraph.textContent = JSON.stringify(dataorders.message);

        // Obtener el elemento HTML donde deseas agregar el párrafo
        const HTMLResponse = document.querySelector("#app");

        // Agregar el párrafo al elemento HTML
        HTMLResponse.appendChild(paragraph);
        console.log(dataorders.OrderNum);
        orderNum = dataorders.OrderNum;

        // Crear un nuevo objeto XMLHttpRequest para la solicitud de embarque
        const xhrShipment = new XMLHttpRequest();
        const datosEmbarque = { "OrderNum": orderNum };

        xhrShipment.open('POST', `${API_URL}/Shipment`);
        //xhrShipment.setRequestHeader('x-api-key', 'daJJpGNt9IvBlSLfpl0oxsWx1ngwcte8fit9lknG8Y9wA');
        xhr.setRequestHeader('x-api-key', 'dOzSD2TCwZNcaOIUvp7rscPIjHukOXhhQEmjmzA2iDhks');
        xhrShipment.setRequestHeader('Authorization', 'Basic ' + btoa('JMEDINA:Nutra2023*#'));
        xhrShipment.setRequestHeader('Content-Type', 'application/json');
        xhrShipment.addEventListener("loadend", CreateEmbarque);
        xhrShipment.send(JSON.stringify(datosEmbarque));
    }
}

function CreateEmbarque() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const dataEmbarque = JSON.parse(this.response);
        console.log(dataEmbarque);
  
        // Crear un nuevo elemento <p>
        const paragraph = document.createElement("p");
  
        // Asignar el contenido de dataEmbarque al texto del párrafo
        paragraph.textContent = JSON.stringify(dataEmbarque.message);
  
        // Obtener el elemento HTML donde deseas agregar el párrafo
        const HTMLResponse = document.querySelector("#app");
  
        // Agregar el párrafo al elemento HTML
        HTMLResponse.appendChild(paragraph);
      } else {
        console.error("Error en la solicitud de embarque:", this.status);
        // Manejar el error de la solicitud de embarque
      }
    }
  }

//xhr.addEventListener("load", inventoryPart);
//const datos = {
//    "PartNum": "INNRS001"
//};
const formOrders = document.getElementById('orders');

// ============================================================
// ====================== CREA ORDENES ========================
// ============================================================
orders.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const docnumcliInput = document.getElementById('docnumcli');
    const docnumcli = docnumcliInput.value;
    const Cant1Input = document.getElementById('Cant1');
    const Cant1 = Cant1Input.value;
    const Cant2Input = document.getElementById('Cant2');
    const Cant2 = Cant2Input.value;
    const Cant3Input = document.getElementById('Cant3');
    const Cant3 = Cant3Input.value;
    const Chk1Input = document.getElementById('checkbox1');
    const Chk1 = Chk1Input.value;
    const Chk2Input = document.getElementById('checkbox2');
    const Chk2 = Chk2Input.value;
    const Chk3Input = document.getElementById('checkbox3');
    const Chk3 = Chk3Input.value;
    //console.log(docnumcli + Cant1 + Cant2 + Cant3 + Chk1 + Chk2 + Chk3);
    
    const partes = [];
    if (checkbox1.checked) {
        const parte1 = { "SKU": "INNRS001", "Qty": Cant1 };
        partes.push(parte1);
    }

    if (checkbox2.checked) {
    const parte2 = { "SKU": "INMUV002", "Qty": Cant2 };
    partes.push(parte2);
    }
    
    if (checkbox3.checked) {
    const parte3 = { "SKU": "INMYS003", "Qty": Cant3 };
    partes.push(parte3);
    }

    const datos = {
        "CustomerID": docnumcli,
        "SKUs": {
              "Partes": partes
          }
      };

    console.log(datos);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/Ordenes`);
    //xhr.setRequestHeader('x-api-key', 'daJJpGNt9IvBlSLfpl0oxsWx1ngwcte8fit9lknG8Y9wA');
    xhr.setRequestHeader('x-api-key', 'dOzSD2TCwZNcaOIUvp7rscPIjHukOXhhQEmjmzA2iDhks');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('USERAPI:S3rv3r2024*#.@'));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", CreateOrders);
    xhr.send(JSON.stringify(datos));
  });


/*
const parte1 = {};
    const parte2 = {
        "SKU": "INMUV002",
        "Qty": Cant2
    };
    const parte3 = {
        "SKU": "INMUV002",
        "Qty": Cant3
    };
    if (checkbox1.checked) {
        const parte1 = {
            "SKU": "INNRS001",
            "Qty": Cant1
        };
        console.log('El checkbox 1 está seleccionado');
    }

*/
