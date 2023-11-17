document.addEventListener("DOMContentLoaded", function () {
    const linkInput = document.getElementById("linkInput");
    const submitButton = document.getElementById("submitButton");
    const resultDiv = document.getElementById("result");
    //Currentbackground y gifpath
    let currentBackground = 0;
    const gifpaths = ['ransomware.gif', 'rns.gif'];

    submitButton.addEventListener("click", function () {
        const link = linkInput.value;
        //referencia al body
        const body= document.body;
        //Cambiar el fondo de la página
        cambiarFondo(body);

        // Hacer la solicitud al servidor proxy local
        fetch("http://127.0.0.1:3000/api/proxy", {  // URL del servidor proxy local
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: link }),  // Envia el enlace como JSON en el cuerpo de la solicitud
        })
        .then(response => response.json())
        .then(function(dataObject) {
            // Procesa la respuesta de la API aquí
            console.log(dataObject);
            // Muestra la respuesta en el resultado
            resultDiv.innerHTML=" ";
            //textContent = `Respuesta de la API: ${JSON.stringify(dataObject)}`;
            const pre = document.createElement('pre');
            pre.textContent = JSON.stringify(dataObject, null, 2);
            resultDiv.appendChild(pre);
        })
        .catch(function(error) {
            console.error(error);
            // Maneja los errores aquí
        });
    });
    function cambiarFondo(body){
        //Cambia al siguiente fondo
        currentBackground= (currentBackground +1)% gifpaths.length;
        body.style.backgroundImage = `url(${gifpaths[currentBackground]})`;
    }
});
