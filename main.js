(() => {
  const shell = document.getElementById("gameShell");
  const frame = document.getElementById("gameFrame");
  const launch = document.getElementById("launchButton");
  const fullscreen = document.getElementById("fullscreenButton");
  let loaded = false;

  function startGame() {
    if (!shell || !frame) return;
    if (!loaded) {
      frame.src = frame.dataset.src;
      loaded = true;
      shell.classList.add("is-live");
      frame.addEventListener("load", () => {
        try { frame.contentWindow.focus(); } catch (_) {}
      }, { once: true });
    }
    shell.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      try { frame.contentWindow.focus(); } catch (_) {}
    }, 350);
  }

  launch?.addEventListener("click", startGame);
  document.querySelectorAll("[data-launch]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      startGame();
      history.replaceState(null, "", "#play");
    });
  });

  fullscreen?.addEventListener("click", async () => {
    if (!shell) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await shell.requestFullscreen();
      }
    } catch (_) {}
  });

  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = String(year); });
})();
