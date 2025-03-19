const comentarios = [
    {
        texto: "Excelente servicio",
        autor: "Gerson Chacon"
    },
    {
        texto: "Los productos llegaron rápido",
        autor: "Ana Hernandez"
    },
    {
        texto: "Muy buena atención al cliente",
        autor: "Fabian Retana"
    }
];

function comentarioHTML(comentario) {
    return `
        <article class="comment-item">
            <p class="comment-text">"${comentario.texto}"</p>
            <p class="comment-author">- ${comentario.autor}</p>
        </article>
    `;
}

const commentList = document.querySelector(".comment-list");

comentarios.forEach(comentario => {
    commentList.innerHTML += comentarioHTML(comentario);
});