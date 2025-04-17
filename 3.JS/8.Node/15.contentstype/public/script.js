console.log('js로딩');

document.getElementById('jsonSendBtn').addEventListener('click', async () => {
  console.log('전송 버튼 클릭');
  const data = document.getElementById('jsonInput').value;
  console.log('data:', data);
  const res = await fetch('/submit-json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
  // 미션2. response의 바디를 프런트엔드에 출력하시오.
  // const reply = await res.text();
  const reply = await res.json();
  // const replyObject = JSON.parse(reply);
  console.log('reply:', reply);
  const output = document.getElementById('output');
  output.innerText = JSON.stringify(reply);
})

document.getElementById('formSubmit').addEventListener('click', async (e) => {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const age = document.getElementById('formAge').value;


  // JSON으로 변환해서 보내기
  // const jsonData = {
  //   name: name,
  //   age: age,
  // }

  // const res = await fetch('/submit-form', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(jsonData)
  // });

  const params = new URLSearchParams();
  params.append('name', name);
  params.append('age', age);

  const res = await fetch('/submit-form', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: params.toString(),
  })
})

document.getElementById('textSendBtn').addEventListener('click', async () => {
  console.log('3번 버튼 클릭');
  const text = document.getElementById('textInput').value;
  const res = await fetch('/submit-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: text,
  });


})