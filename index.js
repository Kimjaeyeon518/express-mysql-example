const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const db = require("./db");

// Other Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "ejs");

// 확장자 리스트 출력
app.get("/", (req, res) => {
  db.query("SELECT * FROM file", (err, data) => {
    if (!err) res.render("index", { FileList: data });
    else res.send(err);
  });
});

// 커스텀 확장자 추가
app.post("/files", (req, res) => {
  const file_extension = req.body.file_extension;
  var msg = "";

  // input validates
  if (file_extension == "" || file_extension.includes(" ")) {
    console.log("확장자가 입력되지 않았습니다.");
    return;
  }

  // 확장자 길이 20자리 미만 체크
  if (file_extension.length > 20) {
    console.log("확장자 길이가 20자리를 초과했습니다. ");
    return;
  }

  db.query(`SELECT count(*) FROM file WHERE file_extension="${file_extension}"`, (err, results) => {
    if (err) res.send(err);

    if (results[0]["count(*)"] != 0) {
      msg = "이미 중복된 확장자가 있습니다.";
      console.log(msg);
      res.send({ message: msg });
    } else {
      db.query(`INSERT INTO file (file_extension) values("${file_extension}")`, (err) => {
        if (err) throw err;
        else {
          msg = `"${file_extension}" 가 추가되었습니다 !`;
          console.log(`${file_extension} is inserted !`);
          res.send({ message: msg });
        }
      });
    }
  });
});

// 고정 확장자 체크값 수정
app.put("/files", (req, res) => {
  const file_data = req.body;

  db.query(`UPDATE file SET is_checked=${file_data.is_checked} WHERE id=${file_data.id}`, (err) => {
    if (err) throw err;
    else console.log(`id: ${file_data.id} is updated !`);
  });
});

// 커스텀 확장자 삭제
app.delete("/files", (req, res) => {
  console.log(req.body);
  const file_data = req.body;

  db.query(`DELETE FROM file WHERE id=${file_data.id}`, (err) => {
    if (err) throw err;
    else console.log(`id: ${file_data.id} is deleted !`);
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
