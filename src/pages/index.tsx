import { useState } from "react";
import { parseResumeFromPdf } from "@/lib/parse-resume-from-pdf";

const defaultFileState = {
	name: "",
	size: 0,
	fileUrl: "",
};

export default function Home() {
	const [file, setFile] = useState(defaultFileState);

	const setNewFile = (newFile: File) => {
		if (file.fileUrl) {
			URL.revokeObjectURL(file.fileUrl);
		}

		const { name, size } = newFile;
		const fileUrl = URL.createObjectURL(newFile);
		setFile({ name, size, fileUrl });
		// onFileUrlChange(fileUrl);
	};

	const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		console.log(files);
		if (!files) return;

		const newFile = files[0];

		setNewFile(newFile);
	};

	const onImportClick = async () => {
		console.log("onImportClick ");
		const resume = await parseResumeFromPdf(file.fileUrl);
		console.log(resume, "Finally....");
		// const settings = deepClone(initialSettings);
		// // Set formToShow settings based on uploaded resume if users have used the app before
		// if (getHasUsedAppBefore()) {
		// 	const sections = Object.keys(settings.formToShow) as ShowForm[];
		// 	const sectionToFormToShow: Record<ShowForm, boolean> = {
		// 		workExperiences: resume.workExperiences.length > 0,
		// 		educations: resume.educations.length > 0,
		// 		projects: resume.projects.length > 0,
		// 		skills: resume.skills.descriptions.length > 0,
		// 		custom: resume.custom.descriptions.length > 0,
		// 	};
		// 	for (const section of sections) {
		// 		settings.formToShow[section] = sectionToFormToShow[section];
		// 	}
		// }
		// saveStateToLocalStorage({ resume, settings });
		// router.push("/resume-builder");
	};
	return (
		<div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-12">
			<div className="text-center space-y-3">
				<div className="pt-3 text-gray-700">
					Browse a pdf file or drop it here
				</div>
				<div className="pt-4">
					<label className="within-outline-theme-purple cursor-pointer rounded-full px-6 pb-2.5 pt-2 font-semibold shadow-sm bg-primary">
						Browse file
						<input
							type="file"
							className="sr-only"
							accept=".pdf"
							onChange={onInputChange}
						/>
					</label>
					<p className="mt-6 text-red-400">Only pdf file is supported</p>
				</div>
				<div className="pt-4">
					<button type="button" className="btn-primary" onClick={onImportClick}>
						Import and Continue <span aria-hidden="true">→</span>
					</button>
					<p className="text-gray-500">
						Note: Import works best on single column resume
					</p>
				</div>
			</div>
		</div>
	);
}
