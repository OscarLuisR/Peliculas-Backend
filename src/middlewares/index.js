// MODIFICAR ...
const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest} = require('./verificaAuth');
const { verificaDatosRegistroPelicula, verificaDatosUpdatePelicula, verificaParametrosPaginacion } = require('./verificaPelicula');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest,
    verificaDatosRegistroPelicula, 
    verificaDatosUpdatePelicula,
    verificaParametrosPaginacion
};