// Load scoped modules.
import spawnProcessPromise from 'spawn-process-promise'

// Load npm modules.
import * as Promise from 'bluebird'
import git from 'git-rev'

// Promisify callback methods.
const gitBranchAsync = Promise.promisify(git.branch)

// Define the asynchronous task.
const execute = async () => {
	// Store the current branch name.
	const branchName = await gitBranchAsync()

	// Switch to the master branch.
	await spawnProcessPromise('git', ['checkout', 'master'])

	// Pull the newest version of the master branch.
	await spawnProcessPromise('git', ['pull'])

	// Merge the topic branch into the master.
	await spawnProcessPromise('git', ['merge', branchName])
}

// Execute the task.
execute()
	.catch((err) => {
		// Rethrow the error.
		throw err
	})