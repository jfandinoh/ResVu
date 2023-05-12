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
exports.deleteRepositoryById = exports.updateRepository = exports.createRepository = exports.getRepositoryById = exports.getRepository = void 0;
const database_1 = require("../database");
const getRepository = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Number(process.env.TEST) != 1) {
            const response = yield database_1.pool.query('SELECT * FROM repositories');
            console.log(response.rows);
            return res.status(200).json(response.rows);
        }
        else {
            return res.status(200).json([{ id: 1, name: '"Identity-Management"', link: '"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"' }]);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.getRepository = getRepository;
const getRepositoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Number(process.env.TEST) != 1) {
            console.log(req.params.id);
            const id = parseInt(req.params.id);
            const response = yield database_1.pool.query('SELECT * FROM repositories WHERE id = $1', [id]);
            console.log(response.rows);
            return res.status(200).json(response.rows);
        }
        else {
            return res.status(200).json([{ id: 1, name: '"Identity-Management"', link: '"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"' }]);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.getRepositoryById = getRepositoryById;
const createRepository = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Number(process.env.TEST) != 1) {
            console.log(req.body);
            const { name, link } = req.body;
            const response = yield database_1.pool.query('INSERT INTO repositories (name,link) VALUES ($1,$2) RETURNING id,name,link', [name, link]);
            console.log(response);
            return res.status(200).json({
                message: 'Repository create',
                body: response.rows
            });
        }
        else {
            return res.status(200).json({
                message: 'Repository create'
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.createRepository = createRepository;
const updateRepository = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Number(process.env.TEST) != 1) {
            console.log(req.params.id);
            console.log(req.body);
            const id = parseInt(req.params.id);
            console.log(req.body);
            const { name, link } = req.body;
            const response = yield database_1.pool.query('UPDATE repositories SET name = $1 , link = $2 WHERE id = $3 RETURNING id,name,link', [name, link, id]);
            console.log(response.rows);
            return res.status(200).json('Repository updated');
        }
        else {
            return res.status(200).json('Repository updated');
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.updateRepository = updateRepository;
const deleteRepositoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Number(process.env.TEST) != 1) {
            console.log(req.params.id);
            const id = parseInt(req.params.id);
            const response = yield database_1.pool.query('DELETE FROM repositories WHERE id = $1', [id]);
            console.log(response);
            return res.status(200).json('Repositoy deleted');
        }
        else {
            return res.status(200).json('Repositoy deleted');
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
});
exports.deleteRepositoryById = deleteRepositoryById;
