(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var vinylcover = (() => {
  // src/app.tsx
  async function main() {
    while (!(Spicetify == null ? void 0 : Spicetify.showNotification) || !Spicetify.Player) {
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
    waitForElement(".cover-art", (coverArt) => {
      if (coverArt.querySelector(".cover-vinyl"))
        return;
      const vinyl = document.createElement("div");
      vinyl.className = "cover-vinyl";
      const style = document.createElement("style");
      style.innerHTML = `
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
        left: 30%;
        transition: left 1s ease-in-out, transform 0.3s linear;
      }

      .main-coverSlotCollapsed-navAltContainer, .HD9s7U5E1RLSWKpXmrqx {
        overflow: visible !important;
      }
      
      .main-coverSlotCollapsed-container {
        margin-inline-end: 16px;
        transition: margin-inline-end 1s ease-in-out;
      }

      /* --- HOVER EFFECT FOR THE VINYL --- */
      .cover-art-image:hover ~ .cover-vinyl {
        left: 55%;
      }
    `;
      document.body.appendChild(style);
      coverArt.appendChild(vinyl);
      const coverArtImage = document.querySelector(".cover-art-image");
      const coverContainer = document.querySelector(".main-coverSlotCollapsed-container");
      if (coverArtImage && coverContainer) {
        coverArtImage.addEventListener("mouseenter", () => {
          coverContainer.style.marginInlineEnd = "30px";
        });
        coverArtImage.addEventListener("mouseleave", () => {
          coverContainer.style.marginInlineEnd = "16px";
        });
      }
      let rotation = 0;
      let lastTime = 0;
      let animationFrame = null;
      function animateVinyl() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1e3;
        lastTime = currentTime;
        rotation += deltaTime * (360 / 10);
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