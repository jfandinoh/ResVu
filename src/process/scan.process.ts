import fetch, { RequestInfo } from "node-fetch";
import {pool} from '../database'
import { QueryResult } from "pg";

interface Ifinding{
	word: string;
  line: number;
} 

const scanningAt = async (id:Number,idRepository:Number):Promise<Object> => {
  try{
    const responseValidation:QueryResult = await pool.query('UPDATE scanRepositories SET ScanningAt = $1, status = \'In Progress\' WHERE idRespository = $2 AND id=$3 RETURNING id,idRespository,status,repositoryName,repositoryUrl',[new Date(),idRepository,id]);
    return responseValidation.rows;
  }
  catch(e){
      console.log(e)
      return 0
  }
}

const FinishedAt = async (id:Number,idRepository:Number):Promise<Object> => {
  try{
    const responseValidation:QueryResult = await pool.query('UPDATE scanRepositories SET FinishedAt = $1 WHERE idRespository = $2 AND id=$3 RETURNING id,idRespository,status,repositoryName,repositoryUrl',[new Date(),idRepository,id]);
    return responseValidation.rows;
  }
  catch(e){
      console.log(e)
      return 0
  }
}

const Findings = async (id:Number,idRepository:Number, findings:String):Promise<Object> => {
  try{
    let status = findings=="[]"? "Success" : "Failure"
    const responseValidation:QueryResult = await pool.query('UPDATE scanRepositories SET Findings = $1, status = $2 WHERE idRespository = $3 AND id=$4 RETURNING id,idRespository,status,repositoryName,repositoryUrl',[findings,status,idRepository,id]);
    return responseValidation.rows;
  }
  catch(e){
      console.log(e)
      return 0
  }
}

const scanRepository = async(url:RequestInfo) => {
  let _findings:Array<Ifinding> =[]
  try {
    const data = await fetch(url)
    if(data.status == 200){
      const textData = await data.text();

    var lineas = textData.split('\n');
    var count = 1;

    let opc = ['PUBLIC_KEY' , 'PRIVATE_KEY']
    lineas.forEach(function(linea){ 
      let splitLinea = linea.split(' ')
      splitLinea.forEach(function(palabra){
        if(palabra.toUpperCase().includes(opc[0])
          || palabra.toUpperCase().includes(opc[1])){
          let _finding:Ifinding={
            word:palabra,
            line:count
          } 
          _findings.push(_finding);
        }
      });
      count++
    })

    return _findings;
    }
    else
    {
      return data.statusText
    }
    
  } catch (err) {
    console.log('fetch error', err);
    return err
  }
};

export const scanProcess = async (id:Number,idRespository:Number, repositoryUrl:string)=> {
  try{
    const _scanningAt = await scanningAt(id,idRespository)
    console.log(`Repository:  ${repositoryUrl}`)
    const _findings = await scanRepository(repositoryUrl);  
    console.log(JSON.stringify(_findings))
    await Findings(id,idRespository,JSON.stringify(_findings))
    const _finishedAt = await FinishedAt(id,idRespository)
  }
  catch(e){console.log(e)}   
}

function request<TResponse>(
  url: string,
  config: RequestInit = {}
   
// This function is async, it will return a Promise:
): Promise<TResponse> {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}
