const AUTH_REGISTRY = [
    { email: "admin@store.com", password: "admin123", name: "System Administrator", role: "Admin" },
    { email: "manager@store.com", password: "manager123", name: "Store Manager", role: "Store Manager" },
    { email: "cashier@store.com", password: "cashier123", name: "POS Cashier", role: "Cashier" },
    { email: "inventory@store.com", password: "inventory123", name: "Inventory Manager", role: "Inventory Associate" }
];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") === "true") return window.location.replace("../dashboard.html");

    const form = document.getElementById("authCoreEngineForm"), emailIn = document.getElementById("email"),
        passIn = document.getElementById("password"), matrix = document.getElementById("validationMatrixDashboard"),
        btn = document.getElementById("submitActionBtn"), toast = document.getElementById("toastAlert");

    let emailOk = false, passOk = false, toastTimer;

    const toggleState = (element, condition, className = "hidden") => {
        element.classList.toggle(className, !condition);
    };

    const triggerToast = (msg) => {
        document.getElementById("toastMessage").textContent = msg;
        toggleState(toast, true);
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toggleState(toast, false), 4000);
    };

    emailIn.addEventListener("input", () => {
        toggleState(toast, false);
        emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailIn.value.trim());
        btn.disabled = !(emailOk && passOk);
    });

    passIn.addEventListener("input", () => {
        toggleState(toast, false);
        const str = passIn.value;
        if (!str) return toggleState(matrix, false);

        const len = str.length >= 8, mix = /[A-Za-z]/.test(str) && /[0-9]/.test(str);

        document.getElementById("ruleMinLen").classList.toggle("passed", len);
        document.getElementById("ruleMixAlpha").classList.toggle("passed", mix);

        passOk = len && mix;
        toggleState(matrix, !passOk);
        btn.disabled = !(emailOk && passOk);
    });

    document.getElementById("eyeVisibilityBtn").addEventListener("click", function () {
        const isPass = passIn.type === "password";
        passIn.type = isPass ? "text" : "password";
        this.classList.toggle("fa-eye", !isPass);
        this.classList.toggle("fa-eye-slash", isPass);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const match = AUTH_REGISTRY.find(u => u.email === emailIn.value.trim().toLowerCase() && u.password === passIn.value);

        if (match) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userName", match.name);
            localStorage.setItem("userRole", match.role);
            window.location.replace("../dashboard.html");
        } else {
            triggerToast("Incorrect email or password.");
            passIn.value = "";
            passOk = false;
            btn.disabled = true;
            toggleState(matrix, false);
        }
    });
});

function prefill(email, pass) {
    const e = document.getElementById("email"), p = document.getElementById("password");
    e.value = email; p.value = pass;
    e.dispatchEvent(new Event('input')); p.dispatchEvent(new Event('input'));
}