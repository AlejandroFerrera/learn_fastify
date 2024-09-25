"use strict";
import { build } from "./app.js";
import closeWithGrace from "close-with-grace";
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

app.listen({ port: 3000 }, function (err, address) {
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
