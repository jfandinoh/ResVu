"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const respository_controller_1 = require("../controllers/respository.controller");
/**
 * @swagger
 * components:
 *  schemas:
 *      repository:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the repository id
 *              name:
 *                  type: string
 *                  description: the repository name
 *              link:
 *                  type: string
 *                  description: the file repository url to scan
 *          required:
 *              - name
 *              - link
 *          example:
 *              name: ITO-Software
 *              link: https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Objetos DB.sql
 *
 */
/**
 * @swagger
 * /repository:
 *   get:
 *     summary: get repository
 *     tags: [repository]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/repository'
 *       400:
 *         description: not found
 *       500:
 *         description: Internal server error
 */
router.get('/repository', respository_controller_1.getRepository);
/**
 * @swagger
 * /repository:
 *   post:
 *     summary: create repository
 *     tags: [repository]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/repository'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal server error
 */
router.post('/repository', respository_controller_1.createRepository);
/**
 * @swagger
 * /repository/{id}:
 *   get:
 *     summary: get repository by id
 *     tags: [repository]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal server error
 */
router.get('/repository/:id', respository_controller_1.getRepositoryById);
/**
 * @swagger
 * /repository/{id}:
 *   delete:
 *     summary: delete repository by id
 *     tags: [repository]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal server error
 */
router.delete('/repository/:id', respository_controller_1.deleteRepositoryById);
/**
 * @swagger
 * /repository/{id}:
 *   put:
 *     summary: update repository
 *     tags: [repository]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/repository'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal server error
 */
router.put('/repository/:id', respository_controller_1.updateRepository);
exports.default = router;
