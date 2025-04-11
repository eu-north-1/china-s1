(function() {
    'use strict';

    // تابع برای بررسی وجود کلمه "فیلترشکن" و نمایش پیام
    function checkForVPN() {
        const vpnKeyword = "فیلترشکن";
        const bodyText = document.body ? (document.body.textContent || document.body.innerText) : '';

        if (bodyText.includes(vpnKeyword)) {
            console.log("فیلترشکن پیدا شد");
            showMessage();
        } else {
            console.log("فیلترشکن پیدا نشد");
        }
    }

    // تابع برای نمایش پیام قرمز رو صفحه
    function showMessage() {
        // اگه پیام قبلاً اضافه شده، دوباره اضافه نکن
        if (document.getElementById('vpn-message')) return;

        const messageDiv = document.createElement("div");
        messageDiv.id = "vpn-message";
        messageDiv.textContent = "پیدا شد";
        messageDiv.style.position = "fixed";
        messageDiv.style.top = "20px";
        messageDiv.style.left = "50%";
        messageDiv.style.transform = "translateX(-50%)";
        messageDiv.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; // قرمز با شفافیت
        messageDiv.style.color = "white";
        messageDiv.style.padding = "10px 20px";
        messageDiv.style.borderRadius = "8px";
        messageDiv.style.fontSize = "20px";
        messageDiv.style.fontFamily = "Arial, sans-serif"; // فونت ساده که همه‌جا کار کنه
        messageDiv.style.zIndex = "9999"; // مطمئن شیم رو همه المان‌ها باشه

        document.body.appendChild(messageDiv);
    }

    // اجرای اولیه با تأخیر
    setTimeout(() => {
        console.log("اسکریپت شروع شد");
        checkForVPN();
    }, 1000);

    // بررسی تغییرات در صفحه
    const observer = new MutationObserver(() => {
        console.log("تغییر در صفحه");
        checkForVPN();
    });
    observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
})();
