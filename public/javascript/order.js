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
  console.log(e);
  document.getElementById("orders").value = JSON.stringify(orderArr);
  e.target.parentElement.parentElement.classList.toggle("theForce") ||
    e.path[2].classList.toggle("theForce");
}
