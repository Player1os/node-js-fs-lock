// Load npm modules.
import * as fse from 'fs-extra'

// Load node modules.
import * as path from 'path'

export const aquire = async (directoryPath: string, name = '') => {
	// Use a lockfile to determine whether a backup operation is already running.
	try {
		await fse.writeFile(path.join(directoryPath, `${name}.lock`), '', { flag: 'wx' })
	} catch (err) {
		return false
	}
	return true
}

export const release = async (directoryPath: string, name = '') => {
	// Remove the lockfile.
	await fse.unlink(path.join(directoryPath, `${name}.lock`))
}
