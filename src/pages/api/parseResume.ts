import { NextApiRequest, NextApiResponse } from "next";
import pdf from "pdf-parse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		res.status(200).json({ parsedContent: parsedData.text });
	} catch (error) {
		console.error("Error parsing resume:", error);
		res
			.status(500)
			.json({ error: "An error occurred while parsing the resume" });
	}
};
export default handler;
