
<script>
	
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hostname === "filiimo.com") {
        if (!localStorage.getItem("popupClosed02")) {
            let popup = document.createElement("div");
            popup.innerHTML = `
                <div id="upgradePopup" style="
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7);
                    display: flex; justify-content: center; align-items: center; z-index: 9999;">
                    <div style="
                        background: #fff; width: 90%; max-width: 350px; border-radius: 15px; padding: 20px; 
                        text-align: center; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);">
                        <img src="https://cdn-icons-png.flaticon.com/512/753/753318.png" alt="Upgrade" 
                            style="width: 60px; margin-bottom: 15px;">
                        <h2 style="color: #ff5722; font-size: 20px; margin-bottom: 10px;">🔥تست جاوا اسکریپت</h2>
                        <ul style="text-align: right; padding-right: 20px; font-size: 14px; color: #444; list-style: none;">
                            <li>⭕تست جاوا اسکریپت⭕️</li>  
						</ul>
                        <button id="closePopup" style="margin-top: 10px; padding: 8px 15px; border: none; 
                            background: #333; color: white; cursor: pointer; border-radius: 8px; font-size: 14px;
                            width: 100%; transition: 0.3s;">
                            ❌ بستن
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(popup);

            // حالا که پاپ‌آپ اضافه شد، دکمه بسته شدن رو بگیر
            document.querySelector("#closePopup").addEventListener("click", function () {
                document.querySelector("#upgradePopup").remove();
                localStorage.setItem("popupClosed02", "true");
            });
        }
    }
});


	
	
	
</script>
