https://codesandbox.io/s/react-snake-game-forked-x3gsmi?file=/src/index.js:2550-2580
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
npm install @mui/material @emotion/react @emotion/styled
npm i react-toastify

//==============GITHUB DEPLOY==============
//1. npm install gh-pages --save-dev

//2. Package.json dr tohirgoo hiine
{
"name": "snake-react",
"version": "0.1.0",
"private": true,
"homepage": "https://ganzorig2022.github.io/snake-react",
"dependencies": {
"react-dom": "^18.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

},
"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"predeploy": "npm run build",
"test": "react-scripts test",
"eject": "react-scripts eject",
"deploy": "gh-pages -d build"
},

//3. npm run deploy
//4. remote dotor settings->pages->
deploy from branch
gh-pages->/root->SAVE hiine.
