document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });

            const result = await response.text();

            if (response.ok) {
                alert('✅ ' + result);
                // Redireccionar si querés: window.location.href = '/login.html';
            } else {
                alert('❌ ' + result);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error del servidor. Intenta de nuevo más tarde.');
        }
    });
});
