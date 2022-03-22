# Frontend Setup

1. Install webpack dependencies
npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2 
2. Compile
npm start - development (ran with this so no issues)
npm build - production (never ran with this)
3. Show it on server or local
local: python -m http.server 
Should show the page on localhost:8000/ 

not sure for aws production server you might have to fiddle around it a bit in the webpack.config.js, package.json and package-lock.json