document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.replace("./auth/login.html");
        return;
    }

    const activeUserName = localStorage.getItem("userName") || "User";
    const activeUserRole = localStorage.getItem("userRole") || "Staff";

    document.getElementById("navUserName").textContent = activeUserName;
    document.getElementById("navUserRole").textContent = activeUserRole;
    document.getElementById("greetingHeaderLabel").textContent = `Welcome Back`;
    document.getElementById("scopeDomainBadge").textContent = activeUserRole;

    document.querySelectorAll(".rail-link").forEach(link => {
        const criteria = link.getAttribute("data-role");
        if (criteria !== "all" && !criteria.includes(activeUserRole)) {
            link.style.display = "none";
        }
    });

    const profileTrigger = document.getElementById('profileMenuTrigger');
    const dropdownBox = document.getElementById('dropdownMenu');

    profileTrigger.addEventListener('click', (e) => { e.stopPropagation(); dropdownBox.classList.toggle('hidden'); });
    document.addEventListener('click', () => dropdownBox.classList.add('hidden'));

    document.getElementById('actionClearSession').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.replace("./auth/login.html");
    });
});