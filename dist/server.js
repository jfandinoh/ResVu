"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const repository_routes_1 = __importDefault(require("./routes/repository.routes"));
const scan_routes_1 = __importDefault(require("./routes/scan.routes"));
const { swaggerDocs: SwaggerDocsV1 } = require("../swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
console.log(`Server on port configurated ${process.env.PORT}`);
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use(repository_routes_1.default);
app.use(scan_routes_1.default);
module.exports = app.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}`);
    SwaggerDocsV1(app, PORT);
});
