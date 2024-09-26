/** @type {import('fastify').FastifyPluginAsync<> } */
import { movieSchema } from "../schemas/movies.js";

export default async function movies(app, opts) {
	app.post("/movies", { schema: movieSchema }, async (request, reply) => {
		const { title, year } = request.body;
		return { title, year };
	});
}
