const fs = require("fs");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");
const { Task, ToolConjunction, Item } = require("../models/index");

class CsvController {
	static async taskMasterExport(req, res, next) {
		try {
			const opt = {
				include: {
					model: ToolConjunction,
					include: {
						model: Item,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
						order: [["createdAt", "DESC"]],
					},
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				order: [["createdAt", "DESC"]],
				where: {
					arcStatus: "avail",
				},
			};

			const data = await Task.findAll(opt);
			console.log(data, "<<< data");
			const csvHeaders = Object.keys(data[0].dataValues)
				.map((key) => {
					if (Array.isArray(data[0].dataValues[key])) {
						return null; // Exclude the key if the value is an array
					}

					const title = key
						.split(/(?=[A-Z])/)
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(" ");

					return {
						id: key,
						title: title,
					};
				})
				.filter((header) => header !== null); // Filter out excluded headers
			console.log(csvHeaders, "<<<< csvHeaders");
			const csvWriter = createObjectCsvWriter({
				path: "csvData/file.csv",
				header: csvHeaders,
			});
			await csvWriter.writeRecords(data);

			// Stream the CSV file as a response
			const filePath = path.join(__dirname, "../csvData/file.csv");
			console.log(filePath, "<<< filePath");

			// creates a readable stream from the specified file path, allowing to efficiently read the file's contents in chunks or streams.
			const fileStream = fs.createReadStream(filePath);

			res.setHeader("Content-Type", "text/csv");
			res.setHeader(
				"Content-Disposition",
				"attachment; filename=exported_data.csv"
			);

			fileStream.pipe(res);

			// res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = CsvController;
