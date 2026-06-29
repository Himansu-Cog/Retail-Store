document.getElementById("btnCompleteSale").onclick = () => {
    document.getElementById("receiptItemsBody").innerHTML = `
        <tr>
            <td>Milk</td>
            <td class="text-center">1</td>
            <td class="text-right">₹50.00</td>
        </tr>
        <tr>
            <td>Bread</td>
            <td class="text-center">1</td>
            <td class="text-right">₹30.00</td>
        </tr>
    `;
    document.getElementById("rPaymentMode").innerText = "CASH";

    document.getElementById("receiptModal").classList.remove("hidden");
};
document.getElementById("btnCloseModalX").onclick = () => {
    document.getElementById("receiptModal").classList.add("hidden");
};
document.getElementById("btnConfirmSale").onclick = () => {
    alert("Order saved successfully");
    cart = [];
    render();
    document.getElementById("receiptModal").classList.add("hidden");
};
document.getElementById("btnClearCart").onclick = () => {
    cart = [];
    render();
};