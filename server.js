// server.js
import jsonServer from "json-server";
import { v4 as uuidv4 } from "uuid";
const server = jsonServer.create();
const router = jsonServer.router("./src/data/db.json");
const middlewares = jsonServer.defaults();

// 미들웨어 설정
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 데이터 생성 시 UUID 추가
server.use((req, res, next) => {
    if (req.method === "GET") {
        req.body.id = uuidv4();
    }
    next();
});

server.use(router);

server.listen(3001, () => {
    console.log("JSON Server is running");
});

// "start": "concurrently \"json-server --watch ./src/data/db.json --port 3001\" \"vite\""
