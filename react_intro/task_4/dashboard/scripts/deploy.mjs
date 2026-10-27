import { cpSync, existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distribution = join(projectDirectory, 'dist');
if (!existsSync(join(distribution, 'index.html'))) {
  throw new Error('Build the dashboard before deploying it: npm run build');
}

function git(args, cwd = projectDirectory) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || 'Git command failed');
  return result.stdout.trim();
}

const repository = git(['remote', 'get-url', 'origin']);
const authorName = git(['config', 'user.name']);
const authorEmail = git(['config', 'user.email']);
const cacheDirectory = join(projectDirectory, 'node_modules', '.cache', 'dashboard-pages');
mkdirSync(cacheDirectory, { recursive: true });
const deploymentDirectory = mkdtempSync(join(cacheDirectory, 'deploy-'));
if (!resolve(deploymentDirectory).startsWith(resolve(cacheDirectory) + sep)) {
  throw new Error('Unexpected deployment directory');
}

git(['init', '--initial-branch=gh-pages'], deploymentDirectory);
git(['config', 'user.name', authorName], deploymentDirectory);
git(['config', 'user.email', authorEmail], deploymentDirectory);
git(['remote', 'add', 'origin', repository], deploymentDirectory);

const branch = spawnSync('git', ['ls-remote', '--exit-code', '--heads', 'origin', 'gh-pages'], {
  cwd: deploymentDirectory, encoding: 'utf8', windowsHide: true,
});
if (branch.status === 0) {
  git(['fetch', '--depth=1', 'origin', 'gh-pages'], deploymentDirectory);
  git(['checkout', '-B', 'gh-pages', 'FETCH_HEAD'], deploymentDirectory);
} else if (branch.status !== 2) {
  throw new Error(branch.stderr || 'Cannot inspect the gh-pages branch');
}

git(['rm', '-r', '--ignore-unmatch', '.'], deploymentDirectory);
cpSync(distribution, deploymentDirectory, { recursive: true });
writeFileSync(join(deploymentDirectory, '.nojekyll'), '');
git(['add', '--all'], deploymentDirectory);
const changes = spawnSync('git', ['diff', '--cached', '--quiet'], {
  cwd: deploymentDirectory, windowsHide: true,
});
if (changes.status === 1) {
  git(['commit', '-m', 'Deploy React intro dashboard'], deploymentDirectory);
} else if (changes.status !== 0) {
  throw new Error('Cannot inspect deployment changes');
}
git(['push', 'origin', 'gh-pages'], deploymentDirectory);
console.log('Dashboard published to the gh-pages branch.');
