import { resolvePkgPath, getPackageJSON, getBaseRollupPlugins } from './util';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('react');
// react包的路径
const pkgPath = resolvePkgPath(name);
// react产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'react',
			format: 'umd' // umd兼容commonjs和es module
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// rimraf dist 删除dist文件
	// jsx runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd' // umd兼容commonjs和es module
			},
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd' // umd兼容commonjs和es module
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
