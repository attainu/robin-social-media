const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const { userAuthenticated } = require('../../helpers/authentication');

const PostCategories =  (req, res) => {
    Category.find({})
        .lean()
        .then(categories => {
            res.render('user/categories/index', { categories });
        });
};

const CreateCategories =  (req, res) => {
    const newCategory = new Category({
        name: req.body.name,
    })
    newCategory.save().then(savedCategory => {
        res.redirect('/user/categories');
    });
};

const GetSingleCategories =  (req, res) => {
    Category.findOne({ _id: req.params.id})
        .lean()
        .then(category => {
            res.render('user/categories/edit', { category });
        });
};

const UpdateCategories =  (req, res) => {
    Category.findOne({ _id: req.params.id})
        .then(category => {
            category.name = req.body.name;
            category.save().then(savedCategory => {
                res.redirect('/user/categories');
            });
        });
};

const DeleteCategories =  (req, res) => {
    Category.deleteOne({ _id: req.params.id })
        .then(result => {
            res.redirect('/user/categories');
        });
};

module.exports = {
    PostCategories,
    CreateCategories,
    GetSingleCategories,
    UpdateCategories,
    DeleteCategories
};
