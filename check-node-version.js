const requiredVersion = 22;
const current = process.versions.node;
const [major] = current.split('.').map(Number);

if (major !== requiredVersion) {
  console.error(
    `❌ Node.js v${requiredVersion} is required. You are using v${current}.`
  );
  process.exit(1);
}
