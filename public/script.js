// ===============================
// CARGAR LISTA DE PROMOCIONES
// ===============================
if (document.getElementById("lista-promociones")) {

    fetch("promociones.json")
        .then(r => r.json())
        .then(data => {

            let html = "";

            data.forEach(p => {

                html += `
                <div class="promocion-card" onclick="window.location.href='promocion.html?id=${p.id}'">

                    <div class="promocion-img" 
                         style="background-image: url('${p.imagen_destacada || 'img/default.jpg'}');">
                    </div>

                    <div class="promocion-etiqueta ${p.estado === 'EN CONSTRUCCIÓN' ? 'construccion' : ''}">
                        ${p.estado}
                    </div>

                    <h3>${p.titulo}</h3>
                    <p class="promocion-ubicacion">📍 ${p.ubicacion}</p>

                </div>`;
            });

            document.getElementById("lista-promociones").innerHTML = html;
        });
}



// ===============================
// CARGAR FICHA INDIVIDUAL
// ===============================
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
                html += `<img src="${img}" class="galeria-img">`;
            });

            html += `<h2>Planos</h2>`;

            p.planos.forEach(pdf => {
                html += `<a href="${pdf}" download class="plano-link">Descargar plano</a><br>`;
            });

            document.getElementById("detalle-promocion").innerHTML = html;
        });
}
