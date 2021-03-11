const router = require('express').Router();
const peliculasCtrl = require('../controllers/peliculas.controller');
const { verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion,  verificaDatosRegistroPelicula, verificaDatosUpdatePelicula } = require('../middlewares/index');

router.get('/', [verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion ], peliculasCtrl.getPeliculas);
router.get('/:id', [verificaToken, verificaPermisoAdmin ], peliculasCtrl.getPeliculaId);
router.post('/', [verificaToken, verificaPermisoAdmin, verificaDatosRegistroPelicula],  peliculasCtrl.createPelicula);
router.put('/:id', [verificaToken, verificaPermisoAdmin, verificaDatosUpdatePelicula], peliculasCtrl.updatePelicula);
router.delete('/:id', [verificaToken, verificaPermisoAdmin], peliculasCtrl.deletePelicula);

module.exports = router;