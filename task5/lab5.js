const fs = require("fs"); // module for working with files
const path = require("path"); //for working with paths
const { EventEmitter } = require("events"); //for a reactive approach

//create an object EventEmitter
const fileEmitter = new EventEmitter();

const filesToRead = ["a.txt", "b.txt", "missing.txt"]; //one file will be missing

//handler for reading files
fileEmitter.on("readFile", (file) => {
    const filePath = path.resolve(__dirname, file);
    fs.readFile(filePath, "utf8", (err, content) => {
        if (err) {
            //if an error occurred, we generate the "error" event
            fileEmitter.emit("error", `Помилка при читанні файлу ${file}: ${err.message}`);
        } else {
            //if everything is fine, generate the "fileRead" event
            fileEmitter.emit("fileRead", { file, content });
        }
    });
});

//handler for successfully reading the file
fileEmitter.on("fileRead", ({ file, content }) => {
    console.log(`Файл "${file}" успішно прочитано. Вміст:\n${content}\n`);
});

//error handler
fileEmitter.on("error", (errMessage) => {
    console.error(errMessage);
});

//completion handler
fileEmitter.on("done", () => {
    console.log("Обробка файлів завершена.");
});

filesToRead.forEach((file, index) => {
    setTimeout(() => fileEmitter.emit("readFile", file), index * 500);
});
setTimeout(() => fileEmitter.emit("done"), filesToRead.length * 500);
