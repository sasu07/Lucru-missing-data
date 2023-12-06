const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const fids = JSON.parse(fs.readFileSync(`${__dirname}/fids.json`));

const getAllFids = (req, res) => {
    res.status(200).json({
        status: 'succes',
        results: fids.length,
        data: {
            fids
        }
    });
};

const createFids = (req,res) => {
    const newId = fids[fids.length - 1].id + 1;
    const newFids = Object.assign({id: newId }, req.body);
    console.log(req.body)
    fids.push(newFids);
    fs.writeFile( `${__dirname}/fids.json`, JSON.stringify(fids), err => {
        res.status(201).json({
            status: 'success',
            data: {
                fids: newFids
            }
        })
    })
};


//app.get('/api/v1/fids', getAllFids)
//app.post('/api/v1/fids', createFids)


app
    .route('/api/v1/fids')
    .get(getAllFids)
    .post(createFids);


const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});



