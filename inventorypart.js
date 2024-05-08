const API_URL = 'https://epicorkinetic.nutrabiotics.co/e10pruebas/api/v2/efx/C01/APIALIVIA';
const xhr = new XMLHttpRequest();

const formInventory = document.getElementById('formPartNum');

function inventoryPart() {
        
    if(this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.response);
        console.log(data);
        
        const HTMLResponse = document.querySelector("#app");
        const inventoryList = data.result.Inventory;
        const paragraph = document.createElement('p');
        paragraph.textContent = JSON.stringify(data.message);
        const ul = document.createElement('ul');
        //const tpl = data.map((Inventory) => `<li>${Inventory.PartDesc}   ${Inventory.QtyOnHand}</li>`);
        //HTMLResponse.innerHTML = `<ul>${tpl}</ul>`
        inventoryList.forEach(item => {
            // Crear un elemento de lista (li) para cada objeto
            const li = document.createElement('li');
      
            // Crear el contenido del elemento li con las propiedades deseadas
            const content = `Producto: ${item.PartDesc},|   --   |Planta: ${item.Plant},|   --   |Cantidad: ${item.QtyOnHand}`;
            li.textContent = content;
      
            // Agregar el elemento li a la lista ul
            ul.appendChild(li);
          });
        // Agregar la lista ul al elemento HTMLResponse
        HTMLResponse.appendChild(ul);
        //HTMLResponse.innerHTML = `<p>${data}</p>`
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