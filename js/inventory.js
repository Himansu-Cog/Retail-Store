document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("stockUpdateForm");
    const container = document.getElementById("toast-container");

    const showToast = (msg, type = "success") => {
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${msg}</span><button type="button" class="toast-close">&times;</button>`;
        
        container.appendChild(toast);
        
        const dismiss = () => {
            toast.style.animation = "toastFadeOut 0.3s ease forwards";
            setTimeout(() => toast.remove(), 300);
        };

        toast.querySelector(".toast-close").addEventListener("click", dismiss);
        setTimeout(dismiss, 4000);
    };

    document.querySelectorAll(".btn-table").forEach(btn => {
        btn.addEventListener("click", () => {
            const sku = btn.getAttribute("data-sku");
            const targetSelect = document.getElementById("targetItem");
            if (targetSelect && sku) {
                targetSelect.value = sku;
                showToast(`Target updated to ${sku} successfully!`, "success");
            }
        });
    });

    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const qty = parseInt(document.getElementById("quantAmount").value, 10);
        const cmnt = document.getElementById("auditComments").value.trim();

        if (isNaN(qty) || qty <= 0) {
            return showToast("Error: Values of 0 or below are not allowed. Please enter a positive number.", "error");
        }
        if (!cmnt) {
            return showToast("Validation Error: Please enter internal audit comments context.", "error");
        }

        showToast("Stock Ledger Processed Successfully! ", "success");
    });
});