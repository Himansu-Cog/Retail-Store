document.addEventListener("DOMContentLoaded", () => {
    const F = document.getElementById("productForm"),
          S = document.getElementById("searchFilter"),
          T = document.getElementById("toastContainer"),
          B = document.getElementById("productTableBody");
    const strictTextRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s\-\.\,\(\)\[\]]+$/;
    const notify = (msg, type = "success") => {
        const t = document.createElement("div");
        t.style.cssText = `padding:12px 20px; margin:8px 0; border-radius:4px; color:#fff; font-weight:500; display:flex; background:${type==='success'?'#2ec4b6':type==='warning'?'#ff9f1c':'#e71d36'}`;
        t.innerHTML = `<span><i class="fa-solid ${type==='success'?'fa-circle-check':'fa-triangle-exclamation'}"></i> ${msg}</span>`;
        T.appendChild(t);
        setTimeout(() => t.remove(), 3500);
    };
    const validateField = (el) => {
        let isValid = el.checkValidity();
        if (el.id === "productName" || el.id === "productSupplier") {
            const val = el.value.trim();
            isValid = val.length >= 3 && val.length <= 100 && strictTextRegex.test(val);
        }
        el.style.borderColor = isValid ? "#2ec4b6" : "#e71d36";
        // el.style.backgroundColor = isValid ? "rgba(46,196,182,0.02)" : "rgba(231,29,54,0.02)";
        return isValid;
    };
    [...F.querySelectorAll("input, select")].forEach(i => i.addEventListener("input", () => validateField(i)));
    F.addEventListener("submit", (e) => {
        e.preventDefault();
        let errors = [];
        const nameVal = F.productName.value.trim();
        const supplierVal = F.productSupplier.value.trim();
        if (nameVal.length < 3 || nameVal.length > 100) {
            errors.push("Product Name architecture violation: Must be between 3 and 100 characters.");
        } else if (!strictTextRegex.test(nameVal)) {
            errors.push("Product Name contains illegal system syntax or lacks alphabetic text characters.");
        }
        if (supplierVal.length < 3 || supplierVal.length > 100) {
            errors.push("Supplier Master entry violation: Corporate identity must be 3 to 100 characters.");
        } else if (!strictTextRegex.test(supplierVal)) {
            errors.push("Supplier Master contains illegal system syntax or lacks alphabetic text characters.");
        }
        if (!F.productCategory.value) errors.push("Select The Category.");
        if (parseFloat(F.productPrice.value) <= 0 || isNaN(F.productPrice.value)) errors.push("Price evaluation error: Value must be strictly greater than 0.");
        if (parseInt(F.productStock.value) < 0 || isNaN(F.productStock.value)) errors.push("Stock volume error: Quantity cannot be lower than 0.");
        if (parseInt(F.productThreshold.value) < 1 || isNaN(F.productThreshold.value)) errors.push("Safety Threshold verification failure: Must be at minimum 1 unit.");
        if (errors.length > 0) return errors.forEach(err => notify(err, "danger"));
        notify(`SKU "${nameVal}" compiled and committed safely!`, "success");
        F.reset();
        [...F.querySelectorAll("input, select")].forEach(i => i.style.cssText = "");
    });
    S.addEventListener("input", (e) => {
        if (/[<>"{}$]/g.test(e.target.value)) {
            notify("Illegal query characters removed from filter interface.", "warning");
            e.target.value = e.target.value.replace(/[<>"{}$]/g, "");
        }
    });

});