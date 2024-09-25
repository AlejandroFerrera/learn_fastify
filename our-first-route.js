async function routes(fastify, options) {
	const collection = fastify.mongo.db.collection("test_collection");

	fastify.get("/", async (request, reply) => {
		return { hello: "world" };
	});

	fastify.get("/animals", async (request, reply) => {
		const result = await collection.find().toArray();

		if (result.length === 0) {
			throw new Error("No documents found");
		}

		return result;
	});

	const animalParamSchema = {
		type: "object",
		properties: {
			animal: { type: "string" },
		},
		required: ["animal"],
	};

	fastify.get(
		"/animals/:animal",
		{ schema: { params: animalParamSchema } },
		async (request, reply) => {
			const result = await collection.findOne({
				animal: request.params.animal,
			});

			if (!result) {
				throw new Error("Invalid value");
			}

			return result;
		}
	);

	const animalBodySchema = {
		type: "object",
		required: ["animal"],
		properties: {
			animal: { type: "string" },
		},
	};

	const schema = {
		body: animalBodySchema,
	};

	fastify.post("/animals", { schema }, async (request, reply) => {
		const result = await collection.insertOne({ animal: request.body.animal });
		return result;
	});
}

export default routes;
