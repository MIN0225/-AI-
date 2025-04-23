document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/carts");
  const cartBody = document.getElementById("cartBody");
  cartItems = await response.json();
  cartItems.forEach((cartItem) => {
    const row = cartBody.insertRow(); // <tr> 추가
    const idCell = row.insertCell(); // id 추가
    idCell.textContent = cartItem.id;

    const nameCell = row.insertCell(); // <td> 추가
    nameCell.textContent = cartItem.name;

    const priceCell = row.insertCell(); // <td> 추가
    priceCell.textContent = cartItem.price;

    const quantityCell = row.insertCell(); // <td> 추가
    quantityCell.textContent = cartItem.quantity;

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";

    plusButton.addEventListener("click", async () => {
      const res = await fetch(`/api/carts/plus/${cartItem.id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        cartItem.quantity++;
        quantityCell.textContent = cartItem.quantity; // 숫자만 넣기
        quantityCell.appendChild(minusButton); // 버튼 다시 붙이기
        quantityCell.appendChild(plusButton);
      }
    });

    minusButton.addEventListener("click", async () => {
      const res = await fetch(`/api/carts/minus/${cartItem.id}`, {
        method: "PATCH",
      });

      if (res.ok && cartItem.quantity > 1) {
        cartItem.quantity--; // 프론트 데이터도 같이 수정

        quantityCell.textContent = cartItem.quantity;
        quantityCell.appendChild(minusButton);
        quantityCell.appendChild(plusButton);
      }
    });

    quantityCell.appendChild(minusButton);
    quantityCell.appendChild(plusButton);

    const actionCell = row.insertCell(); // <td> 추가
    actionCell.textContent = '이거 누르면 세션에서 삭제';

    const removeButton = document.createElement('button');
    removeButton.textContent = '삭제';
    removeButton.addEventListener('click', async () => {
      const response = await fetch(`/api/products/${cartItem.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        row.remove();
      } else {
        console.log("삭제 실패");
      }
    })
    
    actionCell.appendChild(removeButton);
  });
});
