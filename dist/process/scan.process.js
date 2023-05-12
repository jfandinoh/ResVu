"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanProcess = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const database_1 = require("../database");
const scanningAt = (id, idRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseValidation = yield database_1.pool.query('UPDATE scanRepositories SET ScanningAt = $1, status = \'In Progress\' WHERE idRespository = $2 AND id=$3 RETURNING id,idRespository,status,repositoryName,repositoryUrl', [new Date(), idRepository, id]);
        return responseValidation.rows;
    }
    catch (e) {
        console.log(e);
        return 0;
    }
});
const FinishedAt = (id, idRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseValidation = yield database_1.pool.query('UPDATE scanRepositories SET FinishedAt = $1 WHERE idRespository = $2 AND id=$3 RETURNING id,idRespository,status,repositoryName,repositoryUrl', [new Date(), idRepository, id]);
        return responseValidation.rows;
    }
    catch (e) {
        console.log(e);
        return 0;
    }
});
const Findings = (id, idRepository, findings) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status = findings == "[]" ? "Success" : "Failure";
        const responseValidation = yield database_1.pool.query('UPDATE scanRepositories SET Findings = $1, status = $2 WHERE idRespository = $3 AND id=$4 RETURNING id,idRespository,status,repositoryName,repositoryUrl', [findings, status, idRepository, id]);
        return responseValidation.rows;
    }
    catch (e) {
        console.log(e);
        return 0;
    }
});
const scanRepository = (url) => __awaiter(void 0, void 0, void 0, function* () {
    let _findings = [];
    try {
        const data = yield (0, node_fetch_1.default)(url);
        if (data.status == 200) {
            const textData = yield data.text();
            var lineas = textData.split('\n');
            var count = 1;
            let opc = ['PUBLIC_KEY', 'PRIVATE_KEY'];
            lineas.forEach(function (linea) {
                let splitLinea = linea.split(' ');
                splitLinea.forEach(function (palabra) {
                    if (palabra.toUpperCase().includes(opc[0])
                        || palabra.toUpperCase().includes(opc[1])) {
                        let _finding = {
                            word: palabra,
                            line: count
                        };
                        _findings.push(_finding);
                    }
                });
                count++;
            });
            return _findings;
        }
        else {
            return data.statusText;
        }
    }
    catch (err) {
        console.log('fetch error', err);
        return err;
    }
});
const scanProcess = (id, idRespository, repositoryUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _scanningAt = yield scanningAt(id, idRespository);
        console.log(`Repository:  ${repositoryUrl}`);
        const _findings = yield scanRepository(repositoryUrl);
        console.log(JSON.stringify(_findings));
        yield Findings(id, idRespository, JSON.stringify(_findings));
        const _finishedAt = yield FinishedAt(id, idRespository);
    }
    catch (e) {
        console.log(e);
    }
});
exports.scanProcess = scanProcess;
function request(url, config = {}
// This function is async, it will return a Promise:
) {
    return (0, node_fetch_1.default)(url)
        .then((response) => response.json())
        .then((data) => data);
}
