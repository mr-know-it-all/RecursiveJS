'use strict';
const curry = require('./modules/curry/curry.js')
const fs = require('fs');
const hasJsExt = /\.js$/;

function readFiles(path, modules = {}, count = {}) {
	fs.readdir(path, function(err, filenames) {
		if(err) return;
		if(count.toLoad === null) count.toLoad = filenames.length;

		(function forEachFileName([filename, ...xs]) {
			if(filename === undefined) return;

			try {
				let filePath = `${path}/${filename}`;
				let isDir = fs.lstatSync(filePath).isDirectory();
				let isFile = fs.lstatSync(filePath).isFile();
				let isJsFile = hasJsExt.test(filename);

				if(isDir) readFiles(filePath, modules, count);
				else if(isFile && isJsFile) {
					filePath = filePath.replace('./src', '.');
					let fn = require(`${filePath}`);
					modules[fn.name] = fn.length > 1 && fn.name !== 'equals' ? curry(fn) : fn;
					count.loaded += 1;
				}
			} catch(err) {
				console.error(err);
			}

			forEachFileName(xs);
		})(filenames);
	});

	return modules;
};

module.exports = function buildModules() {
	return new Promise((resolve, reject) => {
		let modules = {};
		readFiles('./src/modules', modules, new Proxy({toLoad: null, loaded: 0}, {
			set: (target, prop, value) => {
				let res = Reflect.set(target, prop, value);
				(prop === 'loaded' && target[prop] === target.toLoad) && resolve(modules);
				return res;
			}})
		);
	});
};
