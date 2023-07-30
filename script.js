/************  signin validation starts    ********************/ 

let arrUID = ["PB1234", "PB1235", "PB1236", "PB1237", "PB1238"];
let arrPWD = ["PW1234", "PW1235", "PW1236", "PW1237", "PW1238"];

function getValidate(){
    let uid = document.getElementById("uid").value;
    let pwd = document.getElementById("pwd").value;
    var i=0;
    for(i = 0; i <5 ; i++){
        if((uid == arrUID[i]) && (pwd == arrPWD[i])){
            window.location.href = "product.html"
            alert("Logged In Successfully");
            return false;
        }
    }
    alert("Invalid Credentials!");
}

/************  signin validation ends    ********************/ 
/************ NUMBER TO WORDS  ********************/ 
var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

/************ product script starts   ********************/ 

let items = [];
let grandTotal = 0;
const taxRate = 0.1;

function addItem() {
  const productId = document.getElementById("productId").value;
  const qty = parseInt(document.getElementById("qty").value);
  
  if (!productId || !qty || qty <= 0) {
    alert("Please enter valid ProductId and Qty.");
    return;
  }
  
  // Checking if the item already exists, if yes, updating the quantity
  const existingItem = items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.qty += qty;
    existingItem.totalAmount = existingItem.qty * existingItem.amount;
  } else {
    // Finding the product details from the predefined list 
    const product = products.find(item => item.productId === productId);
    if (!product) {
      alert("Product not found.");
      return;
    }
    const newItem = {
      productId: product.productId,
      qty,
      name: product.name,
      amount: product.amount,
      totalAmount: qty * product.amount
    };
    if(items.length < 5)
      items.push(newItem);
    else{
      alert("You can add a maximum of 5 items.");
            return;
    }
  }
  
  // Clear the input fields
  document.getElementById("productId").value = "";
  document.getElementById("qty").value = "";

  // Updating the item list
  updateItemList();
  // Updating the summary
  updateSummary();
}

function updateItemList() {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = `
    <tr>
      <th>ProductId</th>
      <th>Qty</th>
      <th>Name</th>
      <th>Amount</th>
      <th>Total_Amount</th>
    </tr>
    ${items.map(item => `
      <tr>
        <td>${item.productId}</td>
        <td>${item.qty}</td>
        <td>${item.name}</td>
        <td>${item.amount}</td>
        <td>${item.totalAmount}</td>
      </tr>
    `).join("")}
  `;
}

function updateSummary() {
  grandTotal = items.reduce((total, item) => total + item.totalAmount, 0);
  const taxAmount = grandTotal * taxRate;
  const payableAmount = grandTotal + taxAmount;

  document.getElementById("grandTotal").textContent = grandTotal;
  document.getElementById("taxAmount").textContent = taxAmount;
  document.getElementById("payableAmount").textContent = payableAmount;
}

function generateBill() {
   // Storing the required data in an object to pass it as URL parameters
  const billData = {
    orderItems: JSON.stringify(items),
    grandTotal: grandTotal,
    taxAmount: grandTotal * taxRate,
    payableAmount: grandTotal + grandTotal * taxRate
  };

  // Encode the billData object to a URL-friendly string
  const params = new URLSearchParams(billData).toString();

  // Redirect to the final bill page along with the URL parameters
  window.location.href = `billing.html?${params}`;
  // window.location.href = "billing.html";
}


const products = [
  { productId: "P001", name: "Product 1", amount: 10 },
  { productId: "P002", name: "Product 2", amount: 20 },
  { productId: "P003", name: "Product 3", amount: 30 },
  { productId: "P004", name: "Product 4", amount: 15 },
  { productId: "P005", name: "Product 5", amount: 25 },
  { productId: "P006", name: "Product 6", amount: 12 },
  { productId: "P007", name: "Product 7", amount: 22 },
  { productId: "P008", name: "Product 8", amount: 18 },
  { productId: "P009", name: "Product 9", amount: 28 },
  { productId: "P010", name: "Product 10", amount: 35 },
  { productId: "P011", name: "Product 11", amount: 14 },
  { productId: "P012", name: "Product 12", amount: 24 },
  { productId: "P013", name: "Product 13", amount: 33 },
  { productId: "P014", name: "Product 14", amount: 17 },
  { productId: "P015", name: "Product 15", amount: 26 },
  { productId: "P016", name: "Product 16", amount: 19 },
  { productId: "P017", name: "Product 17", amount: 29 },
  { productId: "P018", name: "Product 18", amount: 16 },
  { productId: "P019", name: "Product 19", amount: 23 },
  { productId: "P020", name: "Product 20", amount: 32 },
  { productId: "P021", name: "Product 21", amount: 21 },
  { productId: "P022", name: "Product 22", amount: 31 },
  { productId: "P023", name: "Product 23", amount: 11 },
  { productId: "P024", name: "Product 24", amount: 27 },
  { productId: "P025", name: "Product 25", amount: 36 },
  { productId: "P026", name: "Product 26", amount: 13 },
  { productId: "P027", name: "Product 27", amount: 20 },
  { productId: "P028", name: "Product 28", amount: 39 },
  { productId: "P029", name: "Product 29", amount: 42 },
  { productId: "P030", name: "Product 30", amount: 37 },
  //We can Add more products here if needed
];

/************ product script ends   ********************/ 