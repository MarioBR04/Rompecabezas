document.getElementById("startBtn").addEventListener("click", () => {

    let nombre = document.getElementById("name") ? document.getElementById("name").value : "";
    let dificultad = document.getElementById("difficulty") ? document.getElementById("difficulty").value : "";
    let imagenSeleccionada = document.querySelector('input[name="image"]:checked');
    let imagen = imagenSeleccionada ? imagenSeleccionada.value : "";
    if (nombre === "" || dificultad === "" || imagen === "") {
        alert("Por favor, completa todos los campos antes de continuar.");
    } else {
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("dificultad", dificultad);
        localStorage.setItem("imagen", imagen);

        window.location.href = "game.html";
    }
});
