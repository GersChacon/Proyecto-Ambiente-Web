document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre_usuario = form.name.value;
        const contraseña = form.password.value;

        const data = new URLSearchParams();
        data.append('nombre_usuario', nombre_usuario);
        data.append('contraseña', contraseña);

        try {
            const res = await fetch('/backend/registro.php', {
                method: 'POST',
                body: data
            });

            const msg = await res.text();
            alert(res.ok ? '✅ ' + msg : '❌ ' + msg);
        } catch (err) {
            alert("Error de red");
        }
    });
});
