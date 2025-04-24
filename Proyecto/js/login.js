document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el envío tradicional del formulario

        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });

            const result = await response.text();

            if (response.ok) {
                alert('✅ ' + result);
                // Redireccionar a otra página, si querés:
                // window.location.href = '/dashboard.html';
            } else {
                alert('❌ ' + result);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error del servidor. Intenta de nuevo más tarde.');
        }
    });
});
