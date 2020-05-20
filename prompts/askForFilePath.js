const inquirer = require('inquirer');
const boxen = require('boxen');

async function askForFilePath({message: 'File Path?', name = 'path', default, prompt: '🖼\nDrag and Drop a file'}) {
	console.log(boxen(, {align: 'center', padding: 4, margin: 1, borderStyle: 'double'}));

	const response = await inquirer
		.prompt({
			type: 'input',
			name,
			message,
			default,
		});
	return response;
}