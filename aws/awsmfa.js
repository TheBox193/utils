const shell = require('shelljs');
const execa = require('execa');

async function runAwsMfa() {
	if(!shell.which('aws-mfa')) {
		console.error('');
		console.error('* You need to install aws-mfa.');
		console.error('');
		console.error('Follow the following steps to get set up:');
		console.error(' → https://pypi.org/project/aws-mfa/');
		process.exit(1);
	}

	try {
		await execa('aws-mfa', {
			stdin: process.stdin,
			stdout: process.stdout,
			stderr: process.stderr,
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}