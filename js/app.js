(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const banners = document.querySelectorAll(".marquee");
    function animateBanner(banner) {
        const bannerContent = banner.querySelector(".marquee__body");
        if (!bannerContent) {
            console.error("Елемент .marquee__body не знайдено.");
            return;
        }
        const originalContentBanners = bannerContent.innerHTML;
        bannerContent.innerHTML += originalContentBanners;
        let position = 0;
        const speed = parseInt(banner.dataset.speedmarquee) || 2;
        const direction = banner.dataset.directionmarquee || "left";
        function updatePosition() {
            if (direction === "left") {
                position -= speed;
                if (position < -bannerContent.offsetWidth / 2) position = 0;
            } else if (direction === "right") {
                position += speed;
                if (position > 0) position = -.8 * bannerContent.offsetWidth;
            }
            bannerContent.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(updatePosition);
        }
        updatePosition();
    }
    banners.forEach((banner => {
        animateBanner(banner);
    }));
    isWebp();
})();