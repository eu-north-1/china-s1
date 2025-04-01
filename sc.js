(function() {
    'use strict';

    // تابع برای غیرفعال کردن دکمه‌ها و المان‌ها
    function disableInteractiveElements() {
        var moreButton = document.querySelector('#MoreBtn.action[data-relation="MerchantInfo"]');
        if (moreButton) {
            moreButton.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            moreButton.style.pointerEvents = "none";
            moreButton.style.cursor = "default";
        }

        var pushCheckboxLabel = document.querySelector('label.checkbox.circle[data-relation="SendReceipt"]');
        if (pushCheckboxLabel) {
            pushCheckboxLabel.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            pushCheckboxLabel.style.pointerEvents = "none";
            pushCheckboxLabel.style.cursor = "default";
        }

        var knowledgeCards = document.querySelectorAll(".knowledge .card .head");
        knowledgeCards.forEach(function (cardHead) {
            cardHead.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            cardHead.style.pointerEvents = "none";
            cardHead.style.cursor = "default";
        });
    }

    // تابع برای مدیریت نمایش صفحه
    function handlePageDisplay() {
        var currentUrl = window.location.href;
        console.log("اسکریپت اجرا شد! URL فعلی: " + currentUrl);

        var moreButton = document.querySelector('#MoreBtn.action[data-relation="MerchantInfo"]');

        if (moreButton) {
            // اگه MoreBtn وجود داشت، وضعیت display رو چک کن
            if (window.getComputedStyle(moreButton).display === "none") {
                showErrorPage(); // اگه display: none بود، پیام خطا نشون بده
            } else {
                disableInteractiveElements(); // اگه display: none نبود، دکمه‌ها رو غیرفعال کن
                // چک کردن تغییرات صفحه (مثلاً اگه "بچرخه" یا ریدایرکت بشه)
                setTimeout(function() {
                    var newMoreButton = document.querySelector('#MoreBtn.action[data-relation="MerchantInfo"]');
                    if (!newMoreButton) {
                        showRedirectMessage(); // اگه بعد از تغییر MoreBtn نبود، پیام انتقال نشون بده
                    } else if (window.getComputedStyle(newMoreButton).display === "none") {
                        showErrorPage(); // اگه بعد از تغییر display: none بود، پیام خطا نشون بده
                    }
                }, 1000); // تأخیر 1 ثانیه برای چک کردن تغییرات
            }
        } else {
            // اگه MoreBtn وجود نداشت
            showRedirectMessage();
        }
    }

    // تابع برای نمایش صفحه خطا
    function showErrorPage() {
        // لود فونت Vazir از CDN معتبر
        var fontLink = document.createElement("link");
        fontLink.href = "https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css";
        fontLink.rel = "stylesheet";
        fontLink.type = "text/css";
        document.head.appendChild(fontLink);

        document.body.innerHTML = "";
        document.body.style.backgroundColor = "white";
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.minHeight = "100vh";
        document.body.style.margin = "0";
        document.body.style.fontFamily = "'Vazir', sans-serif"; // استفاده از فونت Vazir
        document.body.style.overflow = "hidden";

        var message = document.createElement("div");
        message.textContent = "متاسفانه فعلا درگاه در دسترس نمی‌باشد";
        message.style.fontSize = window.innerWidth < 768 ? "20px" : "24px";
        message.style.color = "#333";
        message.style.textAlign = "center";
        message.style.padding = "20px";
        document.body.appendChild(message);
    }

    // تابع برای نمایش پیام انتقال
    function showRedirectMessage() {
        // لود فونت Vazir از CDN معتبر
        var fontLink = document.createElement("link");
        fontLink.href = "https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css";
        fontLink.rel = "stylesheet";
        fontLink.type = "text/css";
        document.head.appendChild(fontLink);

        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "white";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";

        var messageDiv = document.createElement("div");
        messageDiv.style.direction = "rtl";
        messageDiv.style.background = "white";

        var message = document.createElement("p");
        message.style.fontFamily = "'Vazir', sans-serif"; // استفاده از فونت Vazir
        message.textContent = "در حال انتقال به سایت پذیرنده";
        message.style.margin = "0";
        message.style.padding = "20px";
        message.style.fontSize = "20px";
        message.style.color = "#333";
        message.style.fontWeight = "normal";

        messageDiv.appendChild(message);
        overlay.appendChild(messageDiv);
        document.body.appendChild(overlay);
    }

    // اجرای اولیه
    handlePageDisplay();

    // اضافه کردن listener برای تغییرات
    window.addEventListener("orientationchange", function () {
        setTimeout(handlePageDisplay, 100);
    });

    window.addEventListener("resize", function () {
        setTimeout(handlePageDisplay, 100);
    });

    // نظارت بر تغییرات URL بدون رفرش
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            handlePageDisplay();
        }
    }).observe(document, { subtree: true, childList: true });
})();
