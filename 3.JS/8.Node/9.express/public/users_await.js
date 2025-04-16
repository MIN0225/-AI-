document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const userTable = document.getElementById("userTable");

  //최초 페이지에 호출될 때 백엔드에 데이터 요청
  updateTable();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = username.value;

    console.log("생성할 이름:", name);
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    username.value = "";
    updateTable();
  });

  function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }

  async function updateTable() {
    userTable.innerHTML = ""; // 이전 내용 삭제

    const res = await fetch("/users");
    const users = await res.json();
        // console.log(users);
        for (const key in users) {
          const row = document.createElement("div");
          row.innerHTML = `
        <strong>ID:</strong> ${key},
        <strong>Name:</strong> ${users[key]}
        `;

          row.appendChild(createButton("수정", () => editUser(key)));
          row.appendChild(createButton("삭제", () => deleteUser(key)));

          userTable.appendChild(row);
        }
  }

  async function editUser(userId) {
    const newName = prompt("수정할 이름을 입력하세요.");
    try {
      const res = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      })
      
      if (!res.ok) throw new Error("수정 실패");
      alert("수정 성공");
      updateTable();
    } catch(error) {
        alert("수정 중 오류 발생");
      }
  }

  async function deleteUser(userId) {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        
        const res = await fetch(`/users/${userId}`, {
          method: "DELETE",
        }).then((res) => {
          if (!res.ok) throw new Error("삭제 실패");
          alert("삭제 성공");
          updateTable();
        })
      }catch(error) {
          console.error('삭제 중 오류 발생: ', error);
          alert('삭제 중 오류 발생');
        }
    } else {
      alert("장난치지 마시오...");
    }
  }
});