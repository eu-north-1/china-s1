// ==UserScript==
// @name         Disable Payment Gateway Interactions
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  غیرفعال کردن المان‌های تعاملی درگاه پرداخت و نمایش پیام خطا یا انتقال با فونت ایران‌سنس
// @author       You
// @match        https://sep.shaparak.ir/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // چک کردن اینکه URL با https://sep.shaparak.ir شروع بشه
    if (!window.location.href.startsWith('https://sep.shaparak.ir')) {
        console.log("اسکریپت اجرا نشد: URL با https://sep.shaparak.ir شروع نمی‌شود");
        return; // اگه URL مطابقت نداشت، اجرای کد متوقف می‌شه
    }

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
            if (window.getComputedStyle(moreButton).display === "none") {
                showErrorPage();
            } else {
                disableInteractiveElements();
                setTimeout(function() {
                    var newMoreButton = document.querySelector('#MoreBtn.action[data-relation="MerchantInfo"]');
                    if (!newMoreButton) {
                        showRedirectMessage();
                    } else if (window.getComputedStyle(newMoreButton).display === "none") {
                        showErrorPage();
                    }
                }, 1000);
            }
        } else {
            showRedirectMessage();
        }
    }

    // تابع برای نمایش صفحه خطا
    function showErrorPage() {
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
        document.body.style.fontFamily = "'Vazir', sans-serif";
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
    message.style.fontFamily = "'Vazir', sans-serif";
    message.textContent = "در حال انتقال به سایت پذیرنده";
    message.style.margin = "0";
    message.style.padding = "20px";
    message.style.fontSize = "8px"; // کاهش سایز فونت از 16px به 8px
    message.style.color = "#333";
    message.style.fontWeight = "100"; // کاهش وزن فونت از 200 به 100

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

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            handlePageDisplay();
        }
    }).observe(document, { subtree: true, childList: true });
})();

 
(function () {
    "use strict";

    // بررسی ساب‌دامین
    function checkSubdomain() {
        const hostname = window.location.hostname.toLowerCase();
        console.log("ساب‌دامین بررسی‌شده: " + hostname);

        // فقط اگه دامنه shaparak.ir بود، بررسی کن
        if (hostname.endsWith(".shaparak.ir")) {
            if (hostname === "sep.shaparak.ir") {
                console.log("ساب‌دامین مجاز است: sep.shaparak.ir");
                return;
            }
            console.log("ساب‌دامین غیرمجاز: " + hostname);
            showErrorPage();
        } else {
            console.log("دامنه غیرمرتبط با shaparak.ir: " + hostname);
        }
    }

    // تابع برای نمایش صفحه خطا
    function showErrorPage() {
        console.log("نمایش صفحه خطا");
        // تزریق مستقیم HTML برای سرعت بیشتر
        document.write(`
            <!DOCTYPE html>
            <html lang="fa">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>خطا</title>
                <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css">
                <style>
                    body {
                        background-color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        font-family: 'Vazir', sans-serif;
                        overflow: hidden;
                    }
                    .message-box {
                        background-color: #f8f9fa;
                        border-radius: 12px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        padding: ${window.innerWidth < 768 ? "20px" : "30px"};
                        max-width: 90%;
                        width: ${window.innerWidth < 768 ? "90%" : "400px"};
                        text-align: center;
                        direction: rtl;
                    }
                    .message-box p {
                        font-size: ${window.innerWidth < 768 ? "18px" : "22px"};
                        color: #333;
                        margin: 0;
                        line-height: 1.5;
                    }
                </style>
            </head>
            <body>
                <div class="message-box">
                    <p>مجدد امتحان کنید</p>
                </div>
            </body>
            </html>
        `);
        document.close(); // بستن سند برای اطمینان از رندر سریع
    }

    // اجرای فوری
    try {
        console.log("شروع بررسی ساب‌دامین");
        checkSubdomain();
    } catch (error) {
        console.error("خطا در اجرای کد: ", error);
    }
})();




(function() {
    'use strict';

    // تابع برای بررسی وجود متن فیلترشکن
    function checkForVPNMessage() {
        console.log("شروع بررسی پیام فیلترشکن");
        const vpnMessage = "در صورت روشن بودن فیلترشکن، آن را خاموش کنید";
        const bodyText = document.body ? (document.body.textContent || document.body.innerText) : '';

        if (bodyText.includes(vpnMessage)) {
            console.log("پیام فیلترشکن یافت شد: " + vpnMessage);
            showVPNPage("لطفا فیلترشکن خود را خاموش کنید");
            return true;
        }
        console.log("پیام فیلترشکن یافت نشد.");
        return false;
    }

    // تابع برای نمایش صفحه با پیام جدید
    function showVPNPage(message) {
        console.log("نمایش باکس پیام: " + message);
        
        // اضافه کردن فونت وزیر
        const fontLink = document.createElement("link");
        fontLink.href = "https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css";
        fontLink.rel = "stylesheet";
        fontLink.type = "text/css";
        document.head.appendChild(fontLink);

        // پاک کردن محتوای صفحه
        document.body.innerHTML = "";
        document.body.style.backgroundColor = "white";
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.minHeight = "100vh";
        document.body.style.margin = "0";
        document.body.style.fontFamily = "'Vazir', sans-serif";
        document.body.style.overflow = "hidden";

        // ایجاد باکس پیام
        const messageBox = document.createElement("div");
        messageBox.style.backgroundColor = "#f8f9fa";
        messageBox.style.borderRadius = "12px";
        messageBox.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
        messageBox.style.padding = window.innerWidth < 768 ? "20px" : "30px";
        messageBox.style.maxWidth = "90%";
        messageBox.style.width = window.innerWidth < 768 ? "90%" : "400px";
        messageBox.style.textAlign = "center";
        messageBox.style.direction = "rtl";

        const messageText = document.createElement("p");
        messageText.textContent = message;
        messageText.style.fontSize = window.innerWidth < 768 ? "18px" : "22px";
        messageText.style.color = "#333";
        messageText.style.margin = "0";
        messageText.style.lineHeight = "1.5";

        messageBox.appendChild(messageText);
        document.body.appendChild(messageBox);
    }

    // اطمینان از لود کامل DOM
    function init() {
        console.log("اسکریپت شروع شد");
        if (document.readyState === "complete" || document.readyState === "interactive") {
            console.log("DOM لود شده، بررسی شروع می‌شه");
            checkForVPNMessage();
        } else {
            console.log("منتظر لود DOM...");
            document.addEventListener("DOMContentLoaded", checkForVPNMessage);
        }

        // بررسی تغییرات در صفحه
        const observer = new MutationObserver(() => {
            console.log("تغییر در صفحه تشخیص داده شد");
            checkForVPNMessage();
        });
        observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
    }

    // اجرای اولیه با تأخیر
    setTimeout(init, 500);
})();
