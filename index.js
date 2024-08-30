const API_URL = 'https://epicorkinetic.nutrabiotics.co/e10pruebas/api/v2/efx/C01/API-ALIVIA';
const xhr = new XMLHttpRequest();

const formCustomer = document.getElementById('customer');

function CreateCustomer() {
  if(this.readyState === 4 && this.status === 200) {
      const datacustomer = JSON.parse(this.response);
      //console.log(datacustomer);
      // Crear un nuevo elemento <p>
      const paragraph = document.createElement("p");
      
      // Asignar el contenido de dataorders al texto del párrafo
      paragraph.textContent = JSON.stringify(datacustomer.message);

      // Obtener el elemento HTML donde deseas agregar el párrafo
      const HTMLResponse = document.querySelector("#returncustomer");

      // Agregar el párrafo al elemento HTML
      HTMLResponse.appendChild(paragraph);
  }
}

// ============================================================
// ===================== CREA CUSTOMER ========================
// ============================================================
formCustomer.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const docnumcliInput = document.getElementById('docnum');
    const docnum = docnumcliInput.value;
    const tipodocInput = document.getElementById('tipodoc');
    const tipodoc = tipodocInput.value;
    const FirstNameInput = document.getElementById('FirstName');
    const FirstName = FirstNameInput.value;
    const FirstLastNameInput = document.getElementById('FirstLastName');
    const FirstLastName = FirstLastNameInput.value;
    const AddressInput = document.getElementById('Address');
    const Address = AddressInput.value;
    const CellPhoneInput = document.getElementById('CellPhone');
    const CellPhone = CellPhoneInput.value;
    const EmailInput = document.getElementById('Email');
    const Email = EmailInput.value;
    const CelPhoneInput = document.getElementById('CelPhone');
    const CelPhone = CelPhoneInput.value;
    const CommonRegimeInput = document.getElementById('CommonRegime');
    const statusCR = CommonRegimeInput.checked;
    //const CommonRegime = CommonRegimeInput.value;
    const SimplifiedRegimeInput = document.getElementById('SimplifiedRegime');
    const statusSR = SimplifiedRegimeInput.checked;
    //const SimplifiedRegime = SimplifiedRegimeInput.value;
    const ImportantTaxpayerInput = document.getElementById('ImportantTaxpayer');
    const statusITP = ImportantTaxpayerInput.checked;
    //const ImportantTaxpayer = ImportantTaxpayerInput.value;
    const personInput = document.getElementById('person');
    const person = personInput.value;
    console.log(docnum);
    console.log(tipodoc);
    console.log(FirstName);
    console.log(FirstLastName);
    console.log(Address);
    console.log(CellPhone);
    console.log(Email);
    console.log(CelPhone);
    console.log(statusCR);
    console.log(statusSR);
    console.log(statusITP);
    console.log(person);


    const datos = {
        "ClientType": "CUS",
        "DocumentType": tipodoc,
        "DocumentNum": docnum,
        "FirstName": FirstName,
        "OtherName": "",
        "FirstLastName": FirstLastName,
        "SecondLastName": "",
        "Address": Address,
        "PhoneNum": CellPhone,
        "Email": Email,
        "CellPhone": CelPhone,
        "Departament": "11",
        "Municipality": "11001",
        "Neighborhood": "Usaquen",
        "Address2": "",
        "Company": "",
        "CommonRegime": statusCR,
        "SimplifiedRegime": statusSR,
        "ImportantTaxpayer": statusITP,
        "Nature": person,
        "SalesPerson": ""
      };

      //console.log(datos);

      xhr.open('POST', `${API_URL}/CreateCustomer`);
      //xhr.setRequestHeader('x-api-key', 'daJJpGNt9IvBlSLfpl0oxsWx1ngwcte8fit9lknG8Y9wA');
      xhr.setRequestHeader('x-api-key', 'dOzSD2TCwZNcaOIUvp7rscPIjHukOXhhQEmjmzA2iDhks');
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa('USERAPI:S3rv3r2024*#.@'));
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.addEventListener("load", CreateCustomer);
      xhr.send(JSON.stringify(datos));
    });

