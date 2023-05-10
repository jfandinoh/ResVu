import { Router } from 'express'
const router = Router();

import { getRepository,createRepository,getRepositoryById,deleteRepositoryById,updateRepository} from '../controllers/respository.controller'

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
router.get('/repository',getRepository);

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
router.post('/repository',createRepository);

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
router.get('/repository/:id',getRepositoryById);

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
router.delete('/repository/:id',deleteRepositoryById);

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
router.put('/repository/:id',updateRepository);

export default router;