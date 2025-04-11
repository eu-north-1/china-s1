(function() {
    'use strict';

    // تابع برای بررسی وجود کلمه "فیلترشکن"
    function checkForVPN() {
        const vpnKeyword = "فیلترشکن";
        const bodyText = document.body ? (document.body.textContent || document.body.innerText) : '';

        if (bodyText.includes(vpnKeyword)) {
            console.log("پیدا شد");
        } else {
            console.log("پیدا نشد");
        }
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
