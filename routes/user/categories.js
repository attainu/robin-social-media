const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/user/categories');
const { userAuthenticated } = require('../../helpers/authentication');

router.get('/', userAuthenticated, CategoryController.PostCategories);

router.post('/create', CategoryController.CreateCategories);

router.get('/edit/:id', CategoryController.GetSingleCategories);

router.put('/edit/:id', CategoryController.UpdateCategories);

router.delete('/:id', CategoryController.DeleteCategories)

module.exports = router;
