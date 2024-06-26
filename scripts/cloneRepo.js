const simpleGit = require('simple-git');
const path = require('path');

const repoUrl = 'https://github.com/GPT-Engineer-App/whois-domain-search.git';
const localPath = path.resolve(__dirname, '../cloned-repo');

const git = simpleGit();

async function cloneRepo() {
  try {
    await git.clone(repoUrl, localPath);
    console.log('Repository cloned successfully.');
  } catch (error) {
    console.error('Error cloning repository:', error);
  }
}

cloneRepo();