const conn = require('../database/db');

/* 
const faker = require('faker');

let newPelicula;

for (let index = 1; index <= 500; index++) {
    newPelicula = new conn.model('Peliculas')({
        titulo: faker.name.title(),
        urlImagen: faker.image.imageUrl(),
        categoria: faker.music.genre(),
        descripcion: faker.lorem.text(),
        rating: Math.floor((Math.random() * 10) + 1)
    });    
    
    const results = await newPelicula.save();
}

res.send('500 REGISTROS CREADOS');
*/

const peliculasCtrl = {};

peliculasCtrl.getPeliculas = async (req, res) => {
    try {
        const { page, paginationMin, paginationMax } = req.query;
        
        let max = 0, min = 0;
        let pagination = [];
        
        let results = await conn.model('Peliculas').paginate({}, {select: '-createdAt -updatedAt', limit: 10, page});

        if (parseInt(paginationMin) > 0 && parseInt(paginationMax) > 0) {
            if ( results.totalPages <= 10 ){
                min = 1;
                max = results.totalPages;
            }else {
                if ( parseInt(page) >= parseInt(paginationMin) && parseInt(page) <= parseInt(paginationMax) ) {
                    min = parseInt(paginationMin);
                    max = parseInt(paginationMax);
                }else if (parseInt(page) > parseInt(paginationMax)) {
                    min = (parseInt(page) - 10 + 1);
                    max = parseInt(page);
                }else if (parseInt(page) < parseInt(paginationMin)) {
                    min = parseInt(page);
                    max = (parseInt(page) + 10) - 1;
                }
            }
            
            for (let index = min; index <= max; index++) {
                pagination.push(index);            
            }
        }
        
        let resultado = ({
            docs: results.docs,
            totalDocs: results.totalDocs,
            limit: results.limit,
            totalPages: results.totalPages,
            page: results.page,
            pagingCounter: results.pagingCounter,
            hasPrevPage: results.hasPrevPage,
            hasNextPage: results.hasNextPage,
            prevPage: results.prevPage,
            nextPage: results.nextPage,
            pagination: pagination
        });

        res.status(200).json({ status: 200, error: false, message: '', results: resultado});        

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

peliculasCtrl.getPeliculaId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Peliculas').findById({_id: id}, {createdAt: 0, updatedAt: 0});

        res.status(200).json({ status: 200, error: false, message: '', results });

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

peliculasCtrl.createPelicula = async (req, res) => {  
    try {
        const newPelicula = conn.model('Peliculas')(req.body);

        const results = await newPelicula.save();
        
        res.status(200).json({ status: 200, error: false, message: '', results: {_id: results._id, titulo: results.titulo, urlImagen: results.urlImagen, categoria: results.categoria, descripcion: results.descripcion, rating: results.rating }});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

peliculasCtrl.updatePelicula = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Peliculas').findByIdAndUpdate({_id: id}, req.body, {new: true, fields: '-createdAt -updatedAt'});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }  
};

peliculasCtrl.deletePelicula = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await conn.model('Peliculas').findByIdAndDelete({_id: id}, {select: '_id titulo urlImagen categoria descripcion rating'});

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = peliculasCtrl;