document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const asuntoInput = document.getElementById("asunto");
    const mensajeInput = document.getElementById("mensaje");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Validación simple
        if (!nombreInput.value || !emailInput.value || !asuntoInput.value || !mensajeInput.value) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Deshabilitar el botón de envío
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;

        // Simulación de envío de datos (puedes reemplazar esto con una llamada a una API)
        setTimeout(() => {
            alert("¡Mensaje enviado con éxito!");
            form.reset(); // Limpiar el formulario
            submitButton.disabled = false; // Habilitar el botón nuevamente
        }, 2000); // Simular un retraso de 2 segundos
    });
});