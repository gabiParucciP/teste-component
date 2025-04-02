const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',  // ponto de entrada (você pode usar .tsx se usar TS)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'MinhaBiblioteca',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this', // suporte para ambientes Node.js
  },
  externals: [nodeExternals()],  // Para evitar incluir node_modules no bundle
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,  // Adiciona .ts e .tsx
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,         // Para arquivos CSS
        use: [
          'style-loader',      // Adiciona o CSS ao DOM via <style> tag
          'css-loader',        // Resolve importações CSS
          'postcss-loader',    // Processa CSS com o PostCSS
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),  // Limpa a pasta dist antes de gerar o build
  ],
  mode: 'production',
};