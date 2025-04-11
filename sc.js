// ==UserScript==
// @name         Handle VPN Message for Zarinpal
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  نمایش پیام خوشگل برای فیلترشکن در payment.zarinpal.com وقتی متن مشخص باشه
// @author       You
// @match        https://payment.zarinpal.com/*
// @grant        none
// ==/UserScript==

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

    // تابع برای نمایش صفحه فیلترشکن
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

    // اجرای اولیه با تأخیر
    setTimeout(() => {
        console.log("اسکریپت برای payment.zarinpal.com شروع شد");
        checkForVPNMessage();
    }, 1000); // تأخیر برای اطمینان از لود متن

    // بررسی تغییرات در صفحه
    const observer = new MutationObserver(() => {
        console.log("تغییر در صفحه تشخیص داده شد");
        checkForVPNMessage();
    });
    observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
})();
