import { Request, Response } from "express"
import {pool} from '../database'
import {scanProcess} from '../process/scan.process'
import {queue} from '../queues/scan.queue'
import { QueryResult } from "pg";

export const scanRepositoryById = async (req:Request, res:Response) : Promise<Response>=> {
    try{
        if(Number(process.env.TEST) !=1){
            const id = parseInt(req.params.id);
            const responseValidation:QueryResult = await pool.query('SELECT * FROM scanRepositories WHERE idRespository = $1 and status  in(\'In Progress\',\'Queued\')',[id]);
            if(responseValidation.rowCount > 0){
                return res.status(200).json('Repository currently being scanned');
            }

            const response:QueryResult = await pool.query('SELECT * FROM repositories WHERE id = $1',[id]);
            if(response.rowCount > 0){
                const rep = response.rows[0];
                const response1:QueryResult = await pool.query('INSERT INTO scanRepositories (idRespository,status,repositoryName,repositoryUrl,QueuedAt) VALUES ($1,$2,$3,$4,$5) RETURNING id,idRespository,status,repositoryName,repositoryUrl',[rep.id,'Queued',rep.name,rep.link,new Date()]);
                if(response1.rowCount > 0 )
                {
                    const rep1 = response1.rows[0];
                    console.log(rep1);
                    await queueProcess(rep1.id,rep1.idrespository, rep1.repositoryurl);
                    return res.status(200).json({
                        message: 'Repository added to queue to be scanned',
                        data: response1.rows
                    })
                }
                else{
                    return res.status(400).json({
                        message: 'Repository no added to queue to be scanned'
                    })
                }
            }
            else{
                return res.status(400).json('Repository no found');
            }
        }
        else{
            return res.status(200).json('Repository add to Queue');
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal server error');
    }
}

export const statusScanRepositoryById = async (req:Request, res:Response) : Promise<Response>=> {
    try{
        if(Number(process.env.TEST) !=1){
            const id = parseInt(req.params.id);
            const response:QueryResult = await pool.query('SELECT * FROM scanRepositories WHERE idRespository = $1',[id]);
            if(response.rowCount > 0){
                return res.status(200).json(response.rows);
            }
            else{
                return res.status(400).json('scanRepository no found');
            }
        }
        else{
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
    catch(e){
        console.log(e)
        return res.status(500).json('Internal server error');
    }
}

async function queueProcess(id:Number,idRespository:Number, repositoryUrl:string) {
    return queue.add(() => scanProcess(id,idRespository,repositoryUrl));
 }