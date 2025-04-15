document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const userTable = document.getElementById("userTable");

  //최초 페이지에 호출될 때 백엔드에 데이터 요청
  updateTable();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = username.value;

    console.log("생성할 이름:", name);
    fetch("/users", {
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

  function updateTable() {
    userTable.innerHTML = ""; // 이전 내용 삭제

    fetch("/users")
      .then((res) => res.json())
      .then((users) => {
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
      });
  }

  function editUser(userId) {
    const newName = prompt("수정할 이름을 입력하세요.");
    fetch(`/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("수정 실패");
        alert("수정 성공");
        updateTable();
      })
      .catch((error) => {
        alert("수정 중 오류 발생");
      });
  }

  function deleteUser(userId) {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      fetch(`/users/${userId}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) throw new Error("삭제 실패");
        alert("삭제 성공");
        updateTable();
      })
        .catch(error => {
          console.error('삭제 중 오류 발생: ', error);
          alert('삭제 중 오류 발생');
        })
    } else {
      alert("장난치지 마시오...");
    }
  }
});

// function loadUsers() {
//   fetch('/users')
//     .then(res => res.json())
//     .then(users => {
//       userTable.innerHTML = ''
//       for (const id in users) {
//         const userDiv = document.createElement('div');
//         userDiv.innerHTML = `ID: ${id} Name: ${users[id]}`;
//         userDiv.id = id;
//         userTable.appendChild(userDiv);

//         const updateButton = document.createElement('button');
//         updateButton.innerText = '수정';
//         updateButton.classList.add('updateBtn');
//         userDiv.appendChild(updateButton);

//         const deleteButton = document.createElement('button');
//         deleteButton.innerText = '삭제';
//         deleteButton.classList.add('deleteBtn');
//         userDiv.appendChild(deleteButton);
//       }
//   })

// }
