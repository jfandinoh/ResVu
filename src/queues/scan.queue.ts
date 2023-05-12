import pQueue from '@esm2cjs/p-queue'
import {scanProcess} from '../process/scan.process'

export const queue = new pQueue({ concurrency : 2 });

export const queueProcess = async (id:Number,idRespository:Number, repositoryUrl:string) => {
    return queue.add(() => scanProcess(id,idRespository,repositoryUrl));
 }

let count = 0;
queue.on('active', () => {
	console.log(`Working on item #${++count}. Pending: ${queue.pending}`);
});

queue.on('completed', result => {
	console.log('task completed');
});

queue.on('add', () => {
	console.log(`Task is added. Pending: ${queue.pending}`);
});

queue.on('next', () => {
	console.log(`Task is completed. Pending: ${queue.pending}`);
});