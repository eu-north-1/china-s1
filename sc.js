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

    if (!window.location.href.startsWith('https://sep.shaparak.ir')) {
        return;
    }

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

    function handlePageDisplay() {
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
        message.style.fontSize = "8px";
        message.style.color = "#333";
        message.style.fontWeight = "100";

        messageDiv.appendChild(message);
        overlay.appendChild(messageDiv);
        document.body.appendChild(overlay);
    }

    handlePageDisplay();

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

    function checkSubdomain() {
        const hostname = window.location.hostname.toLowerCase();

        if (hostname.endsWith(".shaparak.ir")) {
            if (hostname === "sep.shaparak.ir") {
                return;
            }
            showErrorPage();
        }
    }

    function showErrorPage() {
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
        document.close();
    }

    try {
        checkSubdomain();
    } catch (error) {}
})();

(function() {
    'use strict';

    function checkForVPNMessage() {
        const vpnMessage = "در صورت روشن بودن فیلترشکن، آن را خاموش کنید";
        const bodyText = document.body ? (document.body.textContent || document.body.innerText) : '';

        if (bodyText.includes(vpnMessage)) {
            showVPNPage("لطفا فیلترشکن خود را خاموش کنید");
            return true;
        }
        return false;
    }

    function showVPNPage(message) {
        const fontLink = document.createElement("link");
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

    function init() {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            checkForVPNMessage();
        } else {
            document.addEventListener("DOMContentLoaded", checkForVPNMessage);
        }

        const observer = new MutationObserver(() => {
            checkForVPNMessage();
        });
        observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
    }

    setTimeout(init, 500);
})();
