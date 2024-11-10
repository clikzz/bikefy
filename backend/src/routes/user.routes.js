const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validateUser } = require('../middleware/user.middleware');

router.use(authMiddleware);
router.get('/getUsers', userController.getUsers);
router.post('/addUser', validateUser, userController.addUser);
router.delete('/deleteUser/:rut', userController.deleteUser);
router.put('/updateUserRole/:rut', userController.updateUserRole);

module.exports = router;
