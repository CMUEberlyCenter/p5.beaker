const path = require('path');

module.exports = {
    "entry": {
        'beaker': "./src/beaker/beaker.js",
        'proton': "./src/particles/proton/proton.js",
        'conjugate_base': "./src/particles/conjugate_base/conjugate_base.js",
        'conjugate_base/weak': "./src/particles/conjugate_base/weak/weak.js",
        'conjugate_base/strong': "./src/particles/conjugate_base/strong/strong.js"
    },
    "output": {
        "library": 'p5.beaker',
        "libraryTarget": 'umd',
        "filename": '[name].js',
        "path": path.resolve(__dirname,'lib')
    },
    "module": {
        "rules": [
            {
                "test": /\.(png|svg|jpg|gif)$/,
                "loader": 'url-loader',
                "options": {
                    "limit": Infinity
                }
            },
            {
                "test": /\.css$/,
                "use": ['style-loader','css-loader']
            },
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "loader": "eslint-loader",
                "options": {}
            }
        ]
    },
    "resolve": {
        "alias": {
            'p5': path.resolve(__dirname,'./node_modules/@cmu-eberly-center/p5/lib/p5.min.js')
        }
    },
    "externals":
    [
        {
            "p5": {
                "commonjs": 'p5',
                "commonjs2": 'p5',
                "amd": 'p5',
                "root": '_'
            }
        }
    ]
};
