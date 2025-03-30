// بخش دوم: ایجاد پاپ‌آپ
let popup = document.createElement("div");
popup.innerHTML = `
    <div id="testPopup" style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5);
        display: flex; justify-content: center; align-items: center; z-index: 9999;">
        <div style="
            background: #fff; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="color: #ff0000;">تست ساده</h2>
            <button id="closeTestPopup" style="padding: 5px 10px; background: #000; color: #fff; border: none; cursor: pointer;">
                بستن
            </button>
        </div>
    </div>
`;

document.body.appendChild(popup);

document.querySelector("#closeTestPopup").addEventListener("click", function () {
    document.querySelector("#testPopup").remove();
});
