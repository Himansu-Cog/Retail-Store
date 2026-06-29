
document.addEventListener("DOMContentLoaded", () => {
    const promoForm = document.getElementById("promoForm");
    const searchFilter = document.getElementById("searchFilter");
    
    if (promoForm) {
        promoForm.addEventListener("submit", (e) => {
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;
            const editId = document.getElementById("promotionId").value;

            if (new Date(startDate) > new Date(endDate)) {
                e.preventDefault(); 
                showFeedbackToast("Error: Start Date cannot follow End Date.", true);
                return;
            }

            e.preventDefault(); 
            showFeedbackToast(editId ? `Rule ${editId} updated.` : "New promotion rule deployed to engine registry.");
            
            if (!editId) document.getElementById("promotionId").value = "PRM-" + Math.floor(100000 + Math.random() * 900000);
            resetFormView();
        });

        document.getElementById("btnClear").addEventListener("click", resetFormView);
    }

    document.querySelectorAll(".select-row-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            
            document.getElementById("promotionId").value = row.cells[0].textContent.trim();
            document.getElementById("scopeSelection").value = row.querySelector(".item-scope").textContent.trim();
            document.getElementById("discountPercent").value = row.querySelector(".value-cell").getAttribute("data-val");
            document.getElementById("startDate").value = row.querySelector(".t-start").textContent.trim();
            document.getElementById("endDate").value = row.querySelector(".t-end").textContent.trim();

            document.getElementById("formTitle").textContent = `Modify Active Rule: [${row.cells[0].textContent.trim()}]`;
            document.querySelector(".form-panel-card").scrollIntoView({ behavior: "smooth" });
        });
    });
    if (searchFilter) {
        searchFilter.addEventListener("input", () => {
            const query = searchFilter.value.toLowerCase().trim();
            document.querySelectorAll("#promotionsTableBody tr").forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        });
    }

    function resetFormView() {
        promoForm.reset();
        document.getElementById("promotionId").value = "";
        document.getElementById("formTitle").textContent = "Deploy / Update Promotion Rule";
    }
});

function showFeedbackToast(msg, isAlert = false) {
    let container = document.getElementById("toastContainer") || document.createElement("div");
    if (!container.id) { container.id = "toastContainer"; container.className = "toast-container"; document.body.appendChild(container); }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.borderLeft = `4px solid ${isAlert ? 'var(--danger)' : 'var(--success)'}`;
    toast.innerHTML = `<i class="fa-solid ${isAlert ? 'fa-circle-xmark' : 'fa-circle-check'}" style="color:${isAlert ? 'var(--danger)' : 'var(--success)'}"></i> <span>${msg}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 200); }, 3500);
}