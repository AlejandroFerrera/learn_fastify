"use strict";
import { build } from "./app.js";
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
