const API_URL = 'https://epicorkinetic.nutrabiotics.co/e10pruebas/api/v2/efx/C01/APIALIVIA';
const xhr = new XMLHttpRequest();

const formInventory = document.getElementById('formPartNum');
const formPlat = document.getElementById('formPlant');

function inventoryPart() {
        
    if(this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.response);
        console.log(data);
        
        const HTMLResponse = document.querySelector("#app");
        const inventoryList = data.result.Inventory;
        const paragraph = document.createElement('p');
        
        paragraph.textContent = JSON.stringify(data.message);
        // Obtener el nombre del producto
        const productName = data.result.Inventory[0].PartDesc;

        // Crear un elemento h2 para mostrar el nombre del producto
        const productNameElement = document.createElement('h2');
        productNameElement.textContent = `El nombre del producto es: ${productName}`;
        // Agregar el elemento h2 al elemento HTMLResponse
        HTMLResponse.appendChild(productNameElement);
        const productNamedesc = document.createElement('h3');
        productNamedesc.textContent = `y cuenta con el siguiente inventario en EPICOR:`;
        HTMLResponse.appendChild(productNamedesc);

        const emptyLine1 = document.createElement('div');
        emptyLine1.style.marginBottom = "40px"; // Ajusta el valor según sea necesario
        HTMLResponse.appendChild(emptyLine1);
        const ul = document.createElement('ul');
        //const tpl = data.map((Inventory) => `<li>${Inventory.PartDesc}   ${Inventory.QtyOnHand}</li>`);
        //HTMLResponse.innerHTML = `<ul>${tpl}</ul>`
        inventoryList.forEach(item => {
            // Crear un elemento de lista (li) para cada objeto
            const li = document.createElement('li');
      
            // Crear el contenido del elemento li con las propiedades deseadas
            const content = `EL lote ${item.LotNumber} tiene: ${item.QtyOnHand} Unidad(es) en la planta ${item.Plant}.`;
            li.textContent = content;
      
            // Agregar el elemento li a la lista ul
            ul.appendChild(li);
          });
        // Agregar la lista ul al elemento HTMLResponse
        HTMLResponse.appendChild(ul);
        //HTMLResponse.innerHTML = `<p>${data}</p>`
    }
}

function inventoryPlant() {
        
    if(this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.response);
        console.log(data);
        
        const HTMLResponse = document.querySelector("#appPlant");
        const inventoryList = data.result.Inventory;
        const paragraph = document.createElement('p');
        
        paragraph.textContent = JSON.stringify(data.message);
        //const productName = data.result.Inventory[0].Plant;

        const productNameElement = document.createElement('h2');
        //productNameElement.textContent = `La Planta: ${productName}`;
        HTMLResponse.appendChild(productNameElement);
        const productNamedesc = document.createElement('h3');
        productNamedesc.textContent = `cuenta con el siguiente inventario en EPICOR:`;
        HTMLResponse.appendChild(productNamedesc);

        const emptyLine1 = document.createElement('div');
        HTMLResponse.appendChild(emptyLine1);
        const ul = document.createElement('ul');
        inventoryList.forEach(item => {
            const li = document.createElement('li');
      
            const content = `EL lote ${item.LotNumber} tiene: ${item.QtyOnHand} Unidad(es) en la planta ${item.Plant}.`;
            li.textContent = content;
      
            ul.appendChild(li);
          });
        HTMLResponse.appendChild(ul);
    }
}

formInventory.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const partNumInput = document.getElementById('partNum');
    const partNum = partNumInput.value;

    const datos = {
        "PartNum": partNum
      };
      console.log(datos);
      xhr.open('POST', `${API_URL}/InventoryPart`);
      xhr.setRequestHeader('x-api-key', 'daJJpGNt9IvBlSLfpl0oxsWx1ngwcte8fit9lknG8Y9wA');
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa('JMEDINA:Nutra2023*#'));
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.addEventListener("load", inventoryPart);
      xhr.send(JSON.stringify(datos));
  });

formPlant.addEventListener('submit', function(event) {
event.preventDefault(); // Evitar el envío del formulario
const PlantInput = document.getElementById('Plant');
const Plant = PlantInput.value;

const datos = {
    "PartNum": Plant
    };
    console.log(datos);
    xhr.open('POST', `${API_URL}/InventoryPart`);
    xhr.setRequestHeader('x-api-key', 'daJJpGNt9IvBlSLfpl0oxsWx1ngwcte8fit9lknG8Y9wA');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('JMEDINA:Nutra2023*#'));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", inventoryPlant);
    xhr.send(JSON.stringify(datos));
});