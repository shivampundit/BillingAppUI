// Fetching data from the previous page product
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Geting the data we stored on the previous page
const orderItems = JSON.parse(urlParams.get("orderItems"));
const grandTotal = parseFloat(urlParams.get("grandTotal"));
const taxAmount = parseFloat(urlParams.get("taxAmount"));
const payableAmount = parseFloat(urlParams.get("payableAmount"));

// Function to display the order items on the final bill page
function displayOrderItems() {
  const table = document.querySelector("table");
  let html = `
    <tr>
      <th>ProductId</th>
      <th>Qty</th>
      <th>Name</th>
      <th>Amount</th>
      <th>Total_Amount</th>
    </tr>
  `;

  // Looping through each order item and adding it to the table
  orderItems.forEach(item => {
    html += `
      <tr>
        <td>${item.productId}</td>
        <td>${item.qty}</td>
        <td>${item.name}</td>
        <td>${item.amount}</td>
        <td>${item.totalAmount}</td>
      </tr>
    `;
  });

  table.innerHTML = html;
}

// Function to display the grand total, tax amount, and payable amount
function displaySummary() {
  document.getElementById("grandTotal").textContent = grandTotal;
  document.getElementById("taxAmount").textContent = taxAmount;
  document.getElementById("payableAmount").textContent = payableAmount;
}

// Function to generate a random order ID
function generateOrderId() {
  return "ORDER_" + Math.floor(Math.random() * 1000000);
}

// Displaying the order details and amounts on the final bill page
window.onload = function() {
  document.getElementById("orderId").textContent = generateOrderId();
  displayOrderItems();
  displaySummary();
};

// Function to download the bill
function downloadBill() {
  // Get the HTML content of the final bill page
  const billHTML = document.documentElement.outerHTML;

  // Use an HTML-to-PDF library or other suitable methods to convert the HTML content to a PDF
  // For example, you can use jsPDF or html2pdf.js libraries for this purpose

  // For simplicity, let's just open a new window with the bill content and let the user print or save it manually
  const billWindow = window.open("", "_blank");
  billWindow.document.write(billHTML);
  billWindow.document.close();

  window.print(billHTML);
}