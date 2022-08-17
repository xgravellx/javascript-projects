const router = require('express').Router();
const blogController = require('../controllers/blog_controller');

router.post('/', blogController.aramaYap); // search ile ilgili
router.get('/', blogController.tumMakaleleriGetir);
router.get('/:makaleID', blogController.tekMakaleGetir);

module.exports = router;