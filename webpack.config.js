const path = require('path');
// entry --> output

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),  //nodejs code
        filename: 'bundle.js',
      },
      mode: 'development',
      module: {
        rules: [{
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },{
          test: /\.s?css$/,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ]}  
        ]
      },devtool:'eval-cheap-module-source-map',
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
      },
    
      
}

// loader


//  /\.txt$/ 
//  \.m?js$/
