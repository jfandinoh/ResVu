import { Request, Response } from "express"
import {pool} from '../database'
import { QueryResult } from "pg";

export const getRepository = async (req:Request, res:Response) : Promise<Response>=> {
    try{
        if(Number(process.env.TEST) !=1){
            const response: QueryResult = await pool.query('SELECT * FROM repositories');
            console.log(response.rows);
            return res.status(200).json(response.rows);
        }
        else{
            return res.status(200).json([{id:1,name:'"Identity-Management"',link:'"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"'}]);
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal server error');
    }
}

export const getRepositoryById = async (req:Request, res:Response) : Promise<Response>=> {
    try{
        if(Number(process.env.TEST) !=1){
            console.log(req.params.id);
            const id = parseInt(req.params.id);
            const response: QueryResult = await pool.query('SELECT * FROM repositories WHERE id = $1',[id]);
            console.log(response.rows);
            return res.status(200).json(response.rows);
        }
        else{
            return res.status(200).json([{id:1,name:'"Identity-Management"',link:'"https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs"'}]);
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal server error');
    }
}

export const createRepository = async (req:Request, res:Response) : Promise<Response>=> {
    try{
        if(Number(process.env.TEST) !=1){
            console.log(req.body);
            const {name,link} = req.body;
    
            const response: QueryResult = await pool.query('INSERT INTO repositories (name,link) VALUES ($1,$2) RETURNING id,name,link',[name,link]);
            console.log(response);
            return res.status(200).json({
                message: 'Repository create',
                body: response.rows
            })
        }
        else{
            return res.status(200).json({
                message: 'Repository create'
            })
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal server error');
    }
}

export const updateRepository = async (req:Request, res:Response)=> {
    try{
        if(Number(process.env.TEST) !=1){
            console.log(req.params.id);
            console.log(req.body);
            const id = parseInt(req.params.id);
            console.log(req.body);
            const {name,link} = req.body;
            const response: QueryResult = await pool.query('UPDATE repositories SET name = $1 , link = $2 WHERE id = $3 RETURNING id,name,link',[name,link,id]);
            console.log(response.rows);
            return res.status(200).json('Repository updated');
        }
        else{
            return res.status(200).json('Repository updated');
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal server error');
    }
}

export const deleteRepositoryById = async (req:Request, res:Response) : Promise<Response>=> {
    try{
        if(Number(process.env.TEST) !=1){
            console.log(req.params.id);
            const id = parseInt(req.params.id);
            const response: QueryResult = await pool.query('DELETE FROM repositories WHERE id = $1',[id]);
            console.log(response);
            return res.status(200).json('Repositoy deleted');
        }
        else{
            return res.status(200).json('Repositoy deleted');
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json('Internal server error');
    }
}