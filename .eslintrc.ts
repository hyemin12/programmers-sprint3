/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	env: {
		// 웹브라우저 환경 전용 API 사용 여부를 지정합니다.
		browser: true,
		// Node.js 환경 전용 API 사용 여부를 지정합니다.
		node: true,
		// ES2021에 추가된 API 사용 여부를 지정합니다.
		es2021: true,
	},
	// 이 설정파일의 기반으로 삼을 설정 모음을 지정합니다.
	extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	// 소스코드 분석을 위한 Estree 파서에 전달할 옵션을 지정합니다.
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		quotes: ['error', 'single'],
	},
};

