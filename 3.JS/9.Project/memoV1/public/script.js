document.addEventListener('DOMContentLoaded', () => {
  loadMemos();

  document.getElementById('save').addEventListener('click', async () => {
    const inputTitle = document.getElementById('inputTitle');
    const inputContent = document.getElementById('inputContent');
    const title = inputTitle.value;
    const content = inputContent.value;

    const response = await fetch('/api/memos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, content })
    })

    if (response.ok) {
      const data = await response.json();
      console.log('메모 생성 성공', data.message);

      const memoContainer = document.getElementById('memoContainer');
      const memo = createMemo(data.id, title, content);
      console.log('memo 생성 완료');
      memoContainer.appendChild(memo);
    } else {
      console.log('response 안 오케이');
    }
  })
})

function createMemo(id, title, content) {
  const memo = document.createElement('div');
  memo.className = 'memoBody';
  memo.dataset.id = id;

  const pTitle = document.createElement('p');
  pTitle.textContent = title;

  const pContent = document.createElement('p');
  pContent.textContent = content;

  const updateButton = document.createElement('button');
  updateButton.className = 'updateButton';
  updateButton.textContent = '수정';
  updateButton.addEventListener('click', () => updateMemo(id));
  
  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButton';
  deleteButton.textContent = '삭제';
  deleteButton.addEventListener('click', () => deleteMemo(id));

  memo.appendChild(pTitle);
  memo.appendChild(pContent);
  memo.appendChild(updateButton);
  memo.appendChild(deleteButton);

  return memo;
}

async function updateMemo(id) {
  const title = document.getElementById('inputTitle').value;
  const content = document.getElementById('inputContent').value;

  console.log('updateButton id:', id);

  const response = await fetch(`/api/memos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title, content})
  })

  if (response.ok) {
    loadMemos();
  } else {
    console.log('메모 수정 실패');
  }

  const data = await response.json();
  console.log(`data: ${JSON.stringify(data)}`);
}

async function loadMemos() {
  const response = await fetch('/api/memos', {
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const { memos } = await response.json();
    console.log('memos:', memos);
    const memoContainer = document.getElementById('memoContainer');
    memoContainer.innerHTML = ''; // 기존 메모 초기화

    memos.forEach(memo => {
      const memoElement = createMemo(memo.id, memo.title, memo.content);
      memoContainer.appendChild(memoElement);
    });
  } else {
    console.log('메모 불러오기 실패');
  }
}

async function deleteMemo(id) {
  const response = await fetch(`/api/memos/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  });
  if (response.ok) {
    loadMemos();
    console.log('delteMemo(id) 완료');
  } else {
    console.log('script.js deleteMemo(id) 실패');
  }
}