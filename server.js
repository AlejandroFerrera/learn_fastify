"use strict";
import { build } from "./app.js";
import closeWithGrace from "close-with-grace";
import dotenv from "dotenv";

dotenv.config();
const opts = {};

if (process.stdout.isTTY) {
	opts.logger = {
		transport: {
			target: "pino-pretty",
		},
	};
} else {
	opts.logger = true;
}

const app = await build(opts);
const port = process.env.PORT;
const host = process.env.HOST;

app.listen({ port, host }, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});

closeWithGrace(async ({ signal, err }) => {
	if (err) {
		app.log.error({ err }, "Server closing with error");
	} else {
		app.log.info({ signal }, "Signal received, server closing");
	}
	await app.close();
});

// setTimeout(() => {
// 	throw new Error('Forced error')
// }, 2000)
