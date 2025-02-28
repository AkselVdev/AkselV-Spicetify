(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var vinylcover = (() => {
  // src/app.tsx
  async function main() {
    while (!(Spicetify == null ? void 0 : Spicetify.showNotification) || !Spicetify.Player || !Spicetify.ContextMenu) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    function waitForElement(selector, callback) {
      const element = document.querySelector(selector);
      if (element) {
        callback(element);
      } else {
        setTimeout(() => waitForElement(selector, callback), 100);
      }
    }
    let alwaysShowVinyl = localStorage.getItem("vinyl_alwaysShow") === "true";
    function saveSettings() {
      localStorage.setItem("vinyl_alwaysShow", String(alwaysShowVinyl));
    }
    function openSettingsPopup() {
      const existingPopup = document.querySelector("#vinyl-settings-popup");
      if (existingPopup)
        return;
      const popup = document.createElement("div");
      popup.id = "vinyl-settings-popup";
      popup.innerHTML = `
      <div class="vinyl-popup-content">
        <h3>Vinyl Settings</h3>
        <label>
          <input type="checkbox" id="toggleVinyl" ${alwaysShowVinyl ? "checked" : ""}>
          Always Show Vinyl
        </label>
        <button id="closePopup">Close</button>
      </div>
    `;
      document.body.appendChild(popup);
      document.getElementById("toggleVinyl").addEventListener("change", (e) => {
        alwaysShowVinyl = e.target.checked;
        saveSettings();
        applySettings();
      });
      document.getElementById("closePopup").addEventListener("click", () => {
        popup.remove();
      });
    }
    function applySettings() {
      document.documentElement.style.setProperty("--vinyl-left", alwaysShowVinyl ? "53%" : "30%");
      document.documentElement.style.setProperty("--cover-margin", alwaysShowVinyl ? "30px" : "16px");
    }
    waitForElement(".cover-art", (coverArt) => {
      if (coverArt.querySelector(".cover-vinyl"))
        return;
      const vinyl = document.createElement("div");
      vinyl.className = "cover-vinyl";
      const style = document.createElement("style");
      style.innerHTML = `
      #vinyl-settings-popup {
        background-color: var(--spice-surface0);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        color: white;
        z-index: 9999;
      }
      #closePopup {
        background-color: var(--spice-surface1);
        color: var(--spice-text);
      }
      #closePopup:hover {
        background-color: var(--spice-surface2);
      }
      .vinyl-popup-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .vinyl-popup-content h3 {
        margin: 0;
        font-size: 16px;
      }
      .vinyl-popup-content label {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .vinyl-popup-content button {
        background: #1db954;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
      }

      /* --- Cover Art & Vinyl Styling --- */
      .cover-art {
        position: relative;
        overflow: visible;
      }
      .cover-art-image {
        z-index: 2;
      }
      .cover-vinyl {
        position: absolute;
        width: 95%;
        height: 95%;
        background: url('http://vilmann.eu/files/cd.png') no-repeat center;
        background-size: cover;
        border-radius: 50%;
        z-index: 1;
        top: 4%;
        left: var(--vinyl-left, 30%);
        transition: left 1s ease-in-out, transform 0.3s linear;
      }

      /* --- Ensure the collapsed cover container is visible --- */
      .main-coverSlotCollapsed-navAltContainer, 
      .HD9s7U5E1RLSWKpXmrqx {
        overflow: visible !important;
      }

      .main-coverSlotCollapsed-container {
        margin-inline-end: var(--cover-margin, 16px);
        transition: margin-inline-end 1s ease-in-out;
      }

      /* --- Hover Effect: Move the Vinyl & Adjust Margin --- */
      .cover-art:hover .cover-vinyl,
      .main-coverSlotCollapsed-container:hover .cover-vinyl {
        left: 53% !important;
      }

      .cover-art:hover .main-coverSlotCollapsed-container,
      .main-coverSlotCollapsed-container:hover {
        margin-inline-end: 30px !important;
      }
    `;
      document.body.appendChild(style);
      coverArt.appendChild(vinyl);
      const vinylSettingsItem = new Spicetify.ContextMenu.Item(
        "Vinyl Settings",
        () => openSettingsPopup(),
        () => true
      );
      vinylSettingsItem.register();
      waitForElement(".main-contextMenu-menu", (menu) => {
        const button = menu.querySelector(".main-contextMenu-menuItem");
        if (button) {
          button.classList.add("main-topBar-historyDropDownButton");
        }
      });
      applySettings();
      let rotation = 0;
      let lastTime = 0;
      let animationFrame = null;
      function animateVinyl() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1e3;
        lastTime = currentTime;
        rotation += deltaTime * (360 / 1);
        vinyl.style.transform = `rotate(${rotation}deg)`;
        animationFrame = requestAnimationFrame(animateVinyl);
      }
      function updateVinylRotation() {
        if (Spicetify.Player.isPlaying()) {
          lastTime = performance.now();
          animateVinyl();
        } else {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
        }
      }
      updateVinylRotation();
      Spicetify.Player.addEventListener("onplaypause", updateVinylRotation);
      Spicetify.Player.addEventListener("onplay", updateVinylRotation);
      Spicetify.Player.addEventListener("onpause", updateVinylRotation);
    });
  }
  var app_default = main;

  // ../../../../Local/Temp/spicetify-creator/index.jsx
  (async () => {
    await app_default();
  })();
})();

      })();