function actualizarFecha() {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
    const hora = ahora.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    return `${fecha} ${hora}`;
}

function sincronizar() {
    document.getElementById("dueno_print").value = document.getElementById("dueno").value;
    document.getElementById("mascota_print").value = document.getElementById("mascota").value;
    document.getElementById("nota_print").value = document.getElementById("nota").value;
    document.getElementById("fecha_print").textContent = actualizarFecha();
}

window.imprimir = function () {
    sincronizar();
    setTimeout(() => {
        window.print();
    }, 100);
};

window.descargarPDF = function () {
    sincronizar();
    setTimeout(() => {
        window.print();
    }, 100);
};

function guardarHistorial() {
    const data = {
        dueno: document.getElementById("dueno").value,
        mascota: document.getElementById("mascota").value,
        nota: document.getElementById("nota").value,
        fecha: actualizarFecha()
    };

    const historial = JSON.parse(localStorage.getItem("historial") || "[]");
    historial.push(data);
    localStorage.setItem("historial", JSON.stringify(historial));
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => console.log("SW registrado"))
    .catch(err => console.error("SW error:", err));
}