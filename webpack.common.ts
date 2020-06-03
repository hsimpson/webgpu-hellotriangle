import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const commonConfig: webpack.Configuration = {
  entry: './src/index.ts',

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

export { commonConfig };
