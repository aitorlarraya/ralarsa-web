// Cargar lista de promociones
if (document.getElementById("lista-promociones")) {
    fetch("promociones.json")
        .then(r => r.json())
        .then(data => {
            let html = "";
            data.forEach(p => {
                html += `
                <div class="card">
                    <img src="${p.imagen_destacada || 'img/default.jpg'}">
                    <div class="card-content">
                        <h3>${p.titulo}</h3>
                        <p>${p.estado}</p>
                        <a href="promocion.html?id=${p.id}">Ver promoción</a>
                    </div>
                </div>`;
            });
            document.getElementById("lista-promociones").innerHTML = html;
        });
}

// Cargar ficha individual
if (document.getElementById("detalle-promocion")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch("promociones.json")
        .then(r => r.json())
        .then(data => {
            const p = data.find(x => x.id === id);

            let html = `
                <h1>${p.titulo}</h1>
                <p>${p.descripcion}</p>
                <p><strong>Estado:</strong> ${p.estado}</p>
                <p><strong>Ubicación:</strong> ${p.ubicacion}</p>
                <h2>Galería</h2>
            `;

            p.imagenes.forEach(img => {
                html += `<img src="${img}" style="width:300px;margin:10px;">`;
            });

            html += `<h2>Planos</h2>`;
            p.planos.forEach(pdf => {
                html += `<a href="${pdf}" download>Descargar plano</a><br>`;
            });

            document.getElementById("detalle-promocion").innerHTML = html;
        });
}
