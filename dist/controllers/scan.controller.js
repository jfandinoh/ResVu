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
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusScanRepositoryById = exports.scanRepositoryById = void 0;
const database_1 = require("../database");
const scan_process_1 = require("../process/scan.process");
const scan_queue_1 = require("../queues/scan.queue");
const scanRepositoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Number(process.env.TEST) != 1) {
            const id = parseInt(req.params.id);
            const responseValidation = yield database_1.pool.query('SELECT * FROM scanRepositories WHERE idRespository = $1 and status  in(\'In Progress\',\'Queued\')', [id]);
            if (responseValidation.rowCount > 0) {
                return res.status(200).json('Repository currently being scanned');
            }
            const response = yield database_1.pool.query('SELECT * FROM repositories WHERE id = $1', [id]);
            if (response.rowCount > 0) {
                const rep = response.rows[0];
                const response1 = yield database_1.pool.query('INSERT INTO scanRepositories (idRespository,status,repositoryName,repositoryUrl,QueuedAt) VALUES ($1,$2,$3,$4,$5) RETURNING id,idRespository,status,repositoryName,repositoryUrl', [rep.id, 'Queued', rep.name, rep.link, new Date()]);
                if (response1.rowCount > 0) {
                    const rep1 = response1.rows[0];
                    console.log(rep1);
                    yield queueProcess(rep1.id, rep1.idrespository, rep1.repositoryurl);
                    return res.status(200).json({
                        message: 'Repository added to queue to be scanned',
                        data: response1.rows
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'Repository no added to queue to be scanned'
                    });
                }
            }
            else {
                return res.status(400).json('Repository no found');
            }
        }
        else {
            return res.status(200).json('Repository add to Queue');
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.scanRepositoryById = scanRepositoryById;
const statusScanRepositoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Number(process.env.TEST) != 1) {
            const id = parseInt(req.params.id);
            const response = yield database_1.pool.query('SELECT * FROM scanRepositories WHERE idRespository = $1', [id]);
            if (response.rowCount > 0) {
                return res.status(200).json(response.rows);
            }
            else {
                return res.status(400).json('scanRepository no found');
            }
        }
        else {
            return res.status(200).json([
                {
                    id: 1,
                    idrespository: 6,
                    status: '"Queued"',
                    repositoryname: '"ITO-Software"',
                    repositoryurl: '"https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Objetos DB.sql"',
                    findings: '"[{"word": "private_key","line": 60}]"',
                    queuedat: '"2023-05-11T10:46:36.991Z"',
                    scanningat: null,
                    finishedat: null
                }
            ]);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.statusScanRepositoryById = statusScanRepositoryById;
function queueProcess(id, idRespository, repositoryUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return scan_queue_1.queue.add(() => (0, scan_process_1.scanProcess)(id, idRespository, repositoryUrl));
    });
}
