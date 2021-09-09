const mysql = require("mysql");

// DB Setting
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wodus123",
  port: 3306,
  database: "flow",
});

// DB 연결 확인
db.connect(function (err) {
  if (err) throw err;
  console.log("MySQL is Successful Connected!");
});

const init_file_extension = [
  { file_extension: "bat", is_additional: "0" },
  { file_extension: "cmd", is_additional: "0" },
  { file_extension: "com", is_additional: "0" },
  { file_extension: "cpl", is_additional: "0" },
  { file_extension: "exe", is_additional: "0" },
  { file_extension: "scr", is_additional: "0" },
  { file_extension: "js", is_additional: "0" },
];

// 초기 테이블 생성  -> 처음 한번만 주석 해제 후 'node index.js' 실행
// db.query(
//   `CREATE TABLE file (id INT AUTO_INCREMENT PRIMARY KEY, file_extension VARCHAR(20) NOT NULL UNIQUE, is_checked TINYINT NOT NULL DEFAULT 0, is_additional TINYINT NOT NULL DEFAULT 1)`,
//   (err) => {
//     if (err) throw err;
//     else {
//       console.log(`file 테이블 생성 성공`);
//     }
//   }
// );

// 초기 고정 확장자 데이터 저장 -> 처음 한번만 주석 해제 후 'node index.js' 실행
// for (i = 0; i < init_file_extension.length; i++) {
//   db.query(
//     `INSERT INTO file(file_extension, is_additional) VALUES("${init_file_extension[i].file_extension}", ${init_file_extension[i].is_additional})`,
//     (err) => {
//       if (err) throw err;
//       else {
//         console.log(`init_file_extension 저장 성공`);
//       }
//     }
//   );
// }

module.exports = db;
