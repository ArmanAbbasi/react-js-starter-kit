import fs from 'fs';
import path from 'path';

export default (app) => {
    app.get('/api/products', (req, res) => {
        fs.readFile((path.resolve(__dirname, '../data/products.json')), (err, resp) => {
            if (err) {
                res.send(500, 'Something went wrong');
            }

            res.send(resp);
        });
    });
};