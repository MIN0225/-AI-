document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const inputBox1 = document.getElementById('inputBox1'); // 닉네임
  const inputBox2 = document.getElementById('inputBox2'); // 이름
  const inputBox3 = document.getElementById('inputBox3'); // 나이
  const userTable = document.getElementById('userTable');
  const dialog = document.getElementById('dialog');
  const yesButton = document.getElementById('dialog-yes');
  const noButton = document.getElementById('dialog-no');
  let currentEditId = null;
  const editModal = document.getElementById('editModal');
  const editNickname = document.getElementById('editNickname');
  const editName = document.getElementById('editName');
  const editAge = document.getElementById('editAge');
  const saveEditBtn = document.getElementById('saveEditBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  let targetDeleteId = null; // 삭제 대상 유저 id

  updateTable();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickName = inputBox1.value;
    const name = inputBox2.value;
    const age = inputBox3.value;

    console.log(`닉네임: ${nickName} 이름: ${name} 나이: ${age}`);
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: nickName, name: name, age: age }),
    })

    inputBox1.value = '';
    inputBox2.value = '';
    inputBox3.value = '';
    updateTable();
  })

  function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
  }

  function updateTable() {
    userTable.innerHTML = '';

    fetch('/users')
      .then(res => res.json())
      .then(users => {
        for (const key in users) {
          const row = document.createElement('div');
          row.innerHTML = `
            <strong>ID:</strong> ${key},
            <strong>NickName:</strong> ${users[key].nickname}
            <strong>Name:</strong> ${users[key].name}
            <strong>Age:</strong> ${users[key].age}
          `

          row.appendChild(createButton('수정', () => editUser(key)));
          row.appendChild(createButton('삭제', () => deleteUser(key)));

          userTable.appendChild(row);
        }
      
    })
  }

  // function editUser(userId) {
  //   const newName = prompt('수정할 이름을 입력하세요.');
  //   fetch(`/users/${userId}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: newName })
  //   })
  //     .then(res => {
  //       if (!res.ok) throw new Error('수정 실패');
  //       alert('수정 성공');
  //       updateTable();
  //     })
  //     .catch(error => {
  //       alert('수정 중 오류 발생');
  //     });
  // }

  function editUser(userId) {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        const user = users[userId];
        if (!user) return alert('유저가 존재하지 않음');

        currentEditId = userId;

        editModal.style.display = 'block';
      })
      .catch(err => {
        console.error('유저 정보 불러오기 실패:', err);
        alert('유저 정보 불러오기 실패');
      });
  }

  saveEditBtn.addEventListener('click', () => {
    const updateUser = {
      nickname: editNickname.value,
      name: editName.value,
      age: editAge.value
    };

    fetch(`/users/${currentEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateUser)
    })
      .then(res => {
        if (!res.ok) throw new Error('수정 실패');
        editModal.style.display = 'none';
        updateTable();
      })
      .catch(err => {
        console.error('수정 실패:', err);
    })
  })

  cancelEditBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
  })

  function deleteUser(userId) {
    targetDeleteId = userId;
    dialog.showModal();
  }

  yesButton.addEventListener('click', () => {
    if (targetDeleteId !== null) {
      fetch(`/users/${targetDeleteId}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) throw new Error('삭제 실패');
          dialog.close(); // 모달 닫기
          updateTable();
          alert('삭제 성공');
          targetDeleteId = null;
        })
        .catch(err => {
          alert('삭제 실패');
          dialog.close();
        });
    }
  })

  noButton.addEventListener('click', () => {
    dialog.close();
    targetDeleteId = null;
  })

  // function deleteUser(userId) {
  //   const confirmDelete = confirm('정말로 삭제하시겠습니까?');

  //   if (confirmDelete) {
  //     fetch(`/users/${userId}`, {
  //       method: 'DELETE'
  //     })
  //       .then(res => {
  //         if (!res.ok) throw new Error('삭제 실패');
  //         updateTable();
  //         alert('삭제 성공');
  //       })
  //       .catch(error => {
  //         console.error('삭제 중 오류 발생: ', error);
  //         alert('삭제 중 오류 발생');
  //     })
  //   } else {
  //     alert('삭제를 취소했습니다.');
  //   }
  // }

})