"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const scan_controller_1 = require("../controllers/scan.controller");
/**
 * @swagger
 * components:
 *  schemas:
 *      scan:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the scan id
 *              idRespository:
 *                  type: integer
 *                  description: the repository id
 *              status:
 *                  type: string
 *                  description: the process status
 *              repositoryName:
 *                  type: string
 *                  description: the repositoy name
 *              repositoryUrl:
 *                  type: string
 *                  description: the repository link
  *              Findings:
 *                  type: string
 *                  description: the vulnerability found
 *              QueuedAt:
 *                  type: datetime
 *                  description: the date added in queue
 *              ScanningAt:
 *                  type: datetime
 *                  description: the date scan
 *              FinishedAt:
 *                  type: datetime
 *                  description: the date process finished
 *          required:
 *              - name
 *              - link
 *          example:
 *              id: 1
 *              idRespository: 1
 *              status: Queued|In Progress|Success|Failure
 *              RepositoryName: ITO-Software
 *              RepositoryUrl: https://raw.githubusercontent.com/jfandinoh/ITO-Software/main/Objetos DB.sql
 *              Findings: []
 *              QueuedAt: 2023-05-11T00:28:16.236Z
 *              ScanningAt: 2023-05-11T00:28:16.236Z
 *              FinishedAt: 2023-05-11T00:28:16.236Z
 *
 */
/**
 * @swagger
 * /scan/repository/{id}:
 *   get:
 *     summary: scan repository
 *     tags: [scan]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/scan'
 *       400:
 *         description: not found
 *       500:
 *         description: Internal server error
 */
router.get('/scan/repository/:id', scan_controller_1.scanRepositoryById);
/**
 * @swagger
 * /scan/status/repository/{id}:
 *   get:
 *     summary: scan repository
 *     tags: [scan]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/scan'
 *       400:
 *         description: not found
 *       500:
 *         description: Internal server error
 */
router.get('/scan/status/repository/:id', scan_controller_1.statusScanRepositoryById);
exports.default = router;
