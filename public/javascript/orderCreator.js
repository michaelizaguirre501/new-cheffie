const confirmingIds = [];
document.querySelector("#confirmBtn").addEventListener("click", confirmOrder);

console.log(confirmingIds);

function confirmOrder(e) {
  const ids = document.querySelectorAll("#orderItemId");
  ids.forEach((x, i) => confirmingIds.push(x.innerText));
  document.getElementById("confirmInput").value = JSON.stringify(confirmingIds);
}
