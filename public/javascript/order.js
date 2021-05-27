const cards = document.querySelectorAll(".orderCards");
cards.forEach((x) => x.addEventListener("click", addOrder));

let orderArr = [];

function addOrder(e) {
  const orderId = e.target.value;
  if (orderArr.includes(orderId)) {
    orderArr.splice(orderArr.indexOf(orderId), orderArr.indexOf(orderId) + 1);
  } else {
    orderArr.push(orderId);
  }
  document.getElementById("orders").value = JSON.stringify(orderArr);
}
