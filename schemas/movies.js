export const movieSchema = {
	body: {
		type: "object",
		properties: {
			title: { type: "string" },
			year: { type: "string" },
		},
		required: ["title", "year"],
	},
};
