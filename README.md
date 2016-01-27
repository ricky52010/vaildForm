```
$('#book').validForm({
  src: [
    { name: 'book_name', valid: 'trim', errMsg:'請填寫姓名'},
    { name: 'book_tel', valid: 'trim|tel', errMsg:'請填寫電話|電話格式錯誤'},
    { name: 'book_email', valid: 'trim|email', errMsg:'請填寫E-mail|E-mail格式錯誤'},
    { name: 'book_capt', valid: 'trim', errMsg: '請填寫驗證碼'},
    { name: 'book_message', valid: 'trim|max:200', errMsg: '請填寫內容|輸入內容不得超過200個字'}
  ]
});

<div class='err_box'>
  <label>
  <input type="text" name="book_name"/>
  </label>
  <div class='err_msg'></div>
</div>
```
