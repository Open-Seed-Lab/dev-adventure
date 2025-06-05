import chalk from 'chalk';

export const handleErrorGeneric = (logPrefix, error) => {
	let errorMessage = error?.message
	if (errorMessage?.length > 0) {
		console.error(chalk.red(`[spotify-clone] [backend] ::::: Error : ${logPrefix} ::::: ${error.message}`));
	} else {
		console.error(chalk.red(`[spotify-clone] [backend] ::::: Unknown Error : ${logPrefix} ::::: `));
		console.error(chalk.red(error));
	}
}
