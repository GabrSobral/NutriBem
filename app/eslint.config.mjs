import globals from 'globals';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import typescript from 'plugin:@typescript-eslint/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		rules: {
			'react-native/no-unused-styles': 2,
			'react-native/split-platform-components': 2,
			'react-native/no-inline-styles': 2,
			'react-native/no-color-literals': 2,
			'react-native/no-raw-text': 2,
			'react-native/no-single-element-style-arrays': 2,
			'@typescript-eslint/prefer-as-const': true,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},
		extends: ['plugin:react-native/all', 'eslint:recommended', 'plugin:react/recommended'],
	},
	...eslintPluginPrettierRecommended,
	...react.configs.recommended,
	...reactNative.configs.all,
];
