'use strict';
import * as path from 'path';
import * as fs from 'fs';
import  winston  from  'winston';
import  'winston-daily-rotate-file';
import dotenv from "dotenv";

const debugLogFile = './logs/debug-%DATE%.log';
const errorLogFile = './logs/error-%DATE%.log';
// const configFolder = './';
// const debugLogFile = path.join(configFolder, process.env.LOG_PATH, './debug-%DATE%.log');
// const errorFolder = path.join(configFolder, process.env.LOG_PATH, '/error-%DATE%.log');

const myFormat = winston.format.printf( ({ level, message, timestamp, ...metadata }) => {
	let msg = ` ${timestamp} [${level}] :  ${message} `
	console.log(message);
	if (metadata) {
		try {
			msg += JSON.stringify(metadata)
		} catch (err) {
			console.log(metadata);
			next(err);
		}
	}

	return msg;
});

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.splat(),
		winston.format.timestamp(),
		myFormat
	),

	transports: [
	new winston.transports.File({ 
		// filename: debug-%DATE%.log,
		filename: errorLogFile,
		level: 'error',
		datePattern: 'YYYY-MM-DD',
		handleExceptions: true,
		colorize: true,
		json: false,
		zippedArchive: true
	}),

	new winston.transports.File({ 
		// filename: 'debug-%DATE%.log', 
		filename: debugLogFile,
		level: 'debug', 
		datePattern: 'YYYY-MM-DD',
		handleExceptions: true,
		colorize: true,
		json: false,
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '14d'
	}),
],

	exitOnError: false

});

export default logger;