// Personalização rápida: troque estes valores quando tiver a foto, o endereço e a URL do Apps Script.
const FOTO_DA_LETICIA = "imagens/leticia.jpeg";
const URL_DO_MAPA = "https://www.google.com/maps/dir//S%C3%ADtio+Alameda+Das+Pedras+bh,+Rua+alameda+da+secoia+35+-+condom%C3%ADnio+rural+canto+da+serra+Rua+alameda+da+secoia+35+-+condom%C3%ADnio+rural+canto+da+serra+-+bom+destino+Sta+Luzia+-+Maquin%C3%A9,+Santa+Luzia+-+MG,+33060-615/@-19.9213558,-43.9341399,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xa683c27e96c527:0x8e1b5516c1b3bfe0!2m2!1d-43.814757!2d-19.821621?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D";
const URL_DA_PLANILHA = "https://script.google.com/macros/s/AKfycbwxjrKWD0lAk6KmXYqoka-wi-bGN6G1HN7bd-gJNlxRYRPxjITHtJPkvwdh3p9s9RsI3w/exec"; // Cole aqui a URL terminada em /exec do Google Apps Script.

document.querySelector(".hero").style.backgroundImage = `url("${FOTO_DA_LETICIA}")`;

const mapLink = document.querySelector("#map-link");
const mapPreview = document.querySelector("#map-preview");
if (URL_DO_MAPA) {
  mapLink.href = URL_DO_MAPA;
  mapPreview.href = URL_DO_MAPA;
} else {
  [mapLink, mapPreview].forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("O endereço do sítio será adicionado em breve.");
  }));
}

document.querySelector("#rsvp-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button");
  const name = document.querySelector("#full-name").value.trim();
  const message = document.querySelector("#form-message");

  const showMessage = (text, type = "") => {
    if (!message) {
      alert(text);
      return;
    }

    message.textContent = text;
    message.className = `form-message${type ? ` form-message--${type}` : ""}`;
  };

  if (name.split(/\s+/).length < 2) {
    showMessage("Por favor, informe seu nome completo.", "error");
    return;
  }
  if (!URL_DA_PLANILHA) {
    showMessage("A planilha ainda não foi configurada.", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Enviando...";
  showMessage("Confirmando sua presença...");
  try {
    // no-cors é necessário para enviar o formulário ao Apps Script a partir deste site.
    // A confirmação visual indica que o navegador aceitou o envio.
    await fetch(URL_DA_PLANILHA, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ name, submittedAt: new Date().toISOString() }),
    });
    showMessage(`Presença confirmada, ${name.split(" ")[0]}! Esperamos você. ♥`, "success");
    form.reset();
  } catch {
    showMessage("Não foi possível confirmar agora. Tente novamente em instantes.", "error");
  } finally {
    button.disabled = false;
    button.innerHTML = 'Eu vou <span aria-hidden="true">→</span>';
  }
});
