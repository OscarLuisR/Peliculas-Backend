const { Schema } = require('mongoose');
const joi = require('joi');
const message = require('../libs/message');
const mongoosePaginate = require('mongoose-paginate-v2');

const peliculaSchema = new Schema (
    {
        titulo: {type: String, required: true},
        urlImagen: {type: String, required: true},
        categoria: {type: String, required: true},
        descripcion: {type: String, required: true},
        rating: {type: Number, required: true}        
    },
    {
        timestamps: true,
        versionKey: false
    }
);

peliculaSchema.plugin(mongoosePaginate);

peliculaSchema.validaSchema = joi.object({
    titulo: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Titulo";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Titulo Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    urlImagen: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar una URL";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe ingresar una URL Valida";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    categoria: joi.string()  
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar una Categoria";                        
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar una Categoria Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),
    
    descripcion: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar una Descripcion";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar una Descripcion Valida";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    rating: joi.number()
        .integer()
        .min(0)
        .max(10)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Rating";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Rating Valido";                                             
                        break;
                    case "number.base":
                        err.message = "El Rating debe ser un numero Entero Valido";                                             
                        break;
                    case "number.min":
                        err.message = "El Rating debe tener un valor Minimo de 0";                        
                        break;
                    case "number.max":
                        err.message = "El Rating debe tener un valor Maximo de 10";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = peliculaSchema;
