const express = require('express')
const app = express()
const fs = require('node:fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/post', function (req,res) {
    fs.writeFileSync('text',req.body.text)
    res.send('done')
})
app.get('/',function (req,res) {
    text = fs.readFileSync('text', 'utf-8')
    res.send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="https://unpkg.com/mdui@1.0.2/dist/css/mdui.min.css">
    <title>CrossNote</title>
  </head>
  <body>
    <div class="mdui-toolbar mdui-color-white">
        <span class="mdui-typo-title">CrossNote</span>
        <div class="mdui-toolbar-spacer"></div>
        <a onclick="save()" class="mdui-btn mdui-btn-icon">
          <i class="mdui-icon material-icons">save</i>
        </a>
      </div>
      <div class="mdui-textfield">
        <textarea class="mdui-textfield-input" id="text">${text}</textarea>
      </div>
    <script src="https://unpkg.com/mdui@1.0.2/dist/js/mdui.min.js"></script>
    <script>
        function save() {
            text = document.getElementById('text').value
            xhr = new XMLHttpRequest()
            xhr.open('POST','/post')
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            form='text=' + text
            xhr.send(form)
            xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                mdui.snackbar({
                message: '保存完成'
                });
                }
            }
        }
    </script>
  </body>
</html>`)
})
if(process.argv[2]) {
    port = process.argv[2]
} else {
    port = 8111
}
console.log(`浏览器访问\"http://本机IP:${port}\"来使用本程序`)
app.listen(port)