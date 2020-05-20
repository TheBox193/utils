const inquirer = require('inquirer');

async function askContinueOrEnd({message = 'Continue?', name = 'confirm', default = true}) {
	const response = await inquirer
		.prompt({
			type: 'confirm',
			name,
			message,
			default,
		});
		
	if (!response.confirm) process.exit(0);
	return response;
}