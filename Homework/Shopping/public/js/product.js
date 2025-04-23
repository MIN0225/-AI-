document.addEventListener('DOMContentLoaded', async () => {
  // db products 테이블에 있는 상품 정보 tbody태그에 추가하기
  const response = await fetch('/api/products');
  const products = await response.json();
  const productBody = document.getElementById('productBody');
  products.forEach(product => {
    const row = productBody.insertRow(); // <tr> 추가
    const idCell = row.insertCell(); // ID <td> 추가
    idCell.textContent = product.id;

    const nameCell = row.insertCell(); // 이름 <td> 추가
    nameCell.textContent = product.name;

    const priceCell = row.insertCell();
    priceCell.textContent = product.price;

    const actionCell = row.insertCell();
    const addButton = document.createElement('button');
    addButton.textContent = '담기';

    addButton.addEventListener('click', async () => {
      // 장바구니 추가
      try {
        console.log(`담기 버튼 클릭 product.id: ${product.id}`);
        const res = await fetch(`/api/products/${product.id}`, {
          method: 'POST',
        });
        const data = await res.json();
        console.log(`addButton 장바구니 추가: ${data}`);
      } catch (error) {
        console.log(`장바구니 담기 오류:`, error);
      }

    })
    actionCell.appendChild(addButton);
  })

})