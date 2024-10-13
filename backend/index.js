const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;
const url = require('url');
const fs = require('node:fs');

const server = createServer((request, response) => {
    let queryString = url.parse(request.url, true);
    let query = queryString.query;

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (queryString.pathname != '/') {
        return false;
    }

    let content = "Имя: "+query.firstname+"\nФамилия: "+query.lastname+"\nТелефон: "+query.tel+"\nE-mail: "+query.email+"\n";

    fs.writeFile('./users-database.txt', content, err => {
        if (err) {
            response.end("Произша ошибка. Проверьте логи.");
            console.error(err);
        } else {
            response.end("Ваша заявка успешно принята! Скоро с вами свяжутся.");
        }
    });
    
}); 

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
