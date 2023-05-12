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
exports.queueProcess = exports.queue = void 0;
const p_queue_1 = __importDefault(require("@esm2cjs/p-queue"));
const scan_process_1 = require("../process/scan.process");
exports.queue = new p_queue_1.default({ concurrency: 2 });
const queueProcess = (id, idRespository, repositoryUrl) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.queue.add(() => (0, scan_process_1.scanProcess)(id, idRespository, repositoryUrl));
});
exports.queueProcess = queueProcess;
let count = 0;
exports.queue.on('active', () => {
    console.log(`Working on item #${++count}. Pending: ${exports.queue.pending}`);
});
exports.queue.on('completed', result => {
    console.log('task completed');
});
exports.queue.on('add', () => {
    console.log(`Task is added. Pending: ${exports.queue.pending}`);
});
exports.queue.on('next', () => {
    console.log(`Task is completed. Pending: ${exports.queue.pending}`);
});
