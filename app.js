import Fastify from "fastify";
import routes from "./routes.js";
import dbConnector from "./mongoDBConnector.js";
import movies from "./routes/movies.js";

export async function build(opts = {}) {
	const app = Fastify(opts);

	app.register(dbConnector);
	app.register(routes);
	app.register(movies);

	app.setErrorHandler(async (err, request, reply) => {
		request.log.error({ err });
		reply.code(err.statusCode || 500);

		return { error: err.message };
	});

	app.setNotFoundHandler(async (request, reply) => {
		reply.code(404);
		return "Not Found";
	});

	return app;
}
