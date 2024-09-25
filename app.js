import Fastify from "fastify";
import routes from "./our-first-route.js";
import dbConnector from "./our-db-connector.js";

export async function build(opts = {}) {
	const app = Fastify(opts);

	app.register(dbConnector);
	app.register(routes);

	return app;
}
