const path = require('path'); //incluyo built in node module
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        //rules recibe un array de todos los loaders que vamos a usar, por cada loader necesitamos un objeto
        //por cada lodaer necesitamos la property test donde usamos regular expressions
        rules: [
            {
                test: /\.js$/, //testea todos los arch que terminen con .js, todos los js files usaran babel loader
                exclude: /node_modules/, //excluir todo lo que esa en la carpeta node_modules
                use: {
                    loader: 'babel-loader' //paquete instalado
                }
            }
        ]
    }
}

//loaders en WEbpack nos premiten importar o cargar tood tipo de diferentes archivos y procesarlos. como convertir sass a codigo css o convertir codigo es6 a codigo es5
//babel conveierte codigo es6 a es5
//hay cosas que no se pueden convertir a es5, p ej las promesas, necesitamos polyfill