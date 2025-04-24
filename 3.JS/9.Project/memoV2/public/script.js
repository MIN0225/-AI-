document.addEventListener('DOMContentLoaded', () => {
  loadMemos();

  document.getElementById('save').addEventListener('click', async () => {
    const title = document.getElementById('inputTitle').value;
    const content = document.getElementById('inputContent').value;
    const file = document.getElementById('inputImage').files[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('image', file);
    }

    const response = await fetch('/api/memos', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data.image: ', data.image);

      const memoContainer = document.getElementById('memoContainer');
      const memo = createMemo(data.id, title, content, data.image);
      console.log('memo 생성 완료');
      memoContainer.appendChild(memo);
    } else {
      console.log('response 안 오케이');
    }
  })
})

function createMemo(id, title, content, image) {
  const memo = document.createElement('div');
  memo.className = 'memoBody';
  memo.dataset.id = id;

  const pTitle = document.createElement('p');
  pTitle.textContent = title;

  const pContent = document.createElement('p');
  pContent.textContent = content;

  const img = document.createElement('img');
  img.src = '/images/' + image;
  console.log('프론트 createMemo메소드 imgage: ', image);

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
  memo.appendChild(img);
  memo.appendChild(updateButton);
  memo.appendChild(deleteButton);

  return memo;
}

async function updateMemo(id) {
  const title = document.getElementById('inputTitle').value;
  const content = document.getElementById('inputContent').value;
  const file = document.getElementById('inputImage').files[0];
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  if (file) {
    formData.append('image', file);
  }

  const response = await fetch(`/api/memos/${id}`, {
    method: 'PATCH',
    body: formData
  })

  if (response.ok) {
    const data = await response.json();
    console.log(`data: ${JSON.stringify(data)}`);
    loadMemos();
  } else {
    console.log('메모 수정 실패');
  }
}

async function loadMemos() {
  const response = await fetch('/api/memos');
  if (response.ok) {
    const { memos } = await response.json();
    const memoContainer = document.getElementById('memoContainer');
    memoContainer.innerHTML = ''; // 기존 메모 초기화

    memos.forEach(memo => {
      const memoElement = createMemo(memo.id, memo.title, memo.content, memo.image);
      console.log(`${memo.id} ${memo.title} ${memo.content} ${memo.image}`);
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