async function cargarPromociones() {
    const respuesta = await fetch('promociones.json');
    const promociones = await respuesta.json();

    const lista = document.getElementById('lista-promociones');
    if (!lista) return;

    lista.innerHTML = '';

    promociones.forEach(promo => {
        const card = document.createElement('div');
        card.className = 'promo-card';

        card.innerHTML = `
            <h3>${promo.titulo}</h3>
            <p>${promo.descripcion}</p>
            <p><strong>Estado:</strong> ${promo.estado}</p>
            <a href="promocion.html?id=${promo.id}">Ver promoción</a>
        `;

        lista.appendChild(card);
    });
}

async function cargarPromocion() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) return;

    const respuesta = await fetch('promociones.json');
    const promociones = await respuesta.json();

    const promo = promociones.find(p => p.id === id);
    if (!promo) return;

    document.getElementById('titulo').innerText = promo.titulo;
    document.getElementById('descripcion').innerText = promo.descripcion;
    document.getElementById('estado').innerText = promo.estado;
    document.getElementById('ubicacion').innerText = promo.ubicacion;

    const galeria = document.getElementById('galeria');
    promo.imagenes.forEach(img => {
        const imagen = document.createElement('img');
        imagen.src = img;
        galeria.appendChild(imagen);
    });

    const planos = document.getElementById('planos');
    promo.planos.forEach(pdf => {
        const enlace = document.createElement('a');
        enlace.href = pdf;
        enlace.innerText = "Descargar plano";
        planos.appendChild(enlace);
    });
}

cargarPromociones();
cargarPromocion();
