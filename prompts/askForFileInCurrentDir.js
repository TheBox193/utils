const inquirer = require('inquirer');
const dir = process.cwd();
const fs = require('fs');

const askFilesInCurrentDirectory = async (fileExtensions = []) => {
	const items = await getFilesInCurrentDirectory(fileExtensions);
	const filteredItems = items.filter(isFileSupported(fileExtensions));
	return askForFile(filteredItems);
};

const isFileSupported = (fileExtensions) => (filename) => {
	// If none are defined, all are valid
	if (fileExtensions.length === 0) return true;

	const extension = '.' + filename.split('.').pop();
	return fileExtensions.includes(extension);
};

const getFilesInCurrentDirectory = () => {
	return new Promise(function(resolve, reject) {
		fs.readdir(dir, function(err, filenames){
			if (err) reject(err); 
			resolve(filenames);
		});
	});
}

const askForFile = (items) => {
	return inquirer.prompt({type: 'list', name: 'file', message: 'Which file?', choices: items}).then(({file}) => {
		return dir + '/' + file;
	});
};
