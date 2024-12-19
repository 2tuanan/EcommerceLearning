const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require('cloudinary').v2;
const categoryModel = require('../../models/categoryModel');
const { response } = require("express");
class categoryControllers {
    add_category = async (req, res) => {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                responseReturn(res, 404, { error: 'Something went wrong' });
            } else {
                let { name } = fields
                let { image } = files
                name = name.trim();
                const slug = name.split(' ').join('-');

                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true
                })

                try {
                    const result = await cloudinary.uploader.upload(image.filepath, {
                        folder: 'categorys'
                    })
                    if (result) {
                        const category = await categoryModel.create({
                            name,
                            slug,
                            image: result.url
                        })
                        responseReturn(res, 201, { category,message: 'Category added successfully' });
                    } else {
                        responseReturn(res, 404, { error: 'Image upload failed' });
                    }
                } catch (error) {
                    responseReturn(res, 500, { error: 'Internal Server Error' });
                }
            }
        })    
    }
    // End method
    get_category = async (req, res) => {
        const {page, searchValue, parPage} = req.query;
        const skipPage = parseInt(parPage) * (parseInt(page) - 1); 
        try {
            if (searchValue && page && parPage) {
                const categorys = await categoryModel.find({
                    $text: { $search: searchValue }
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
                const totalCategory = await categoryModel.find({
                    $text: { $search: searchValue }
                }).countDocuments();
                responseReturn(res, 200, { categorys, totalCategory });
            } else if (searchValue === '' && page && parPage) {
                const categorys = await categoryModel.find({}).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
                const totalCategory = await categoryModel.find({}).countDocuments();
                responseReturn(res, 200, { categorys, totalCategory });

            } else {
                const categorys = await categoryModel.find({}).sort({ createdAt: -1 });
                const totalCategory = await categoryModel.find({}).countDocuments();
                responseReturn(res, 200, { categorys, totalCategory });
            }
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    }
    // End method
    update_category = async (req, res) => {
        const { id } = req.params;
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                responseReturn(res, 404, { error: 'Something went wrong' });
            } else {
                let { name } = fields
                let { image } = files
                name = name.trim();
                const slug = name.split(' ').join('-');

                try {
                    let result = null
                    if (image) {
                        cloudinary.config({
                            cloud_name: process.env.cloud_name,
                            api_key: process.env.api_key,
                            api_secret: process.env.api_secret,
                            secure: true
                        })
                        result = await cloudinary.uploader.upload(image.filepath, {
                            folder: 'categorys'
                        })
                    }
                    const updateData = {
                        name,
                        slug
                    }
                    if (result) {
                        updateData.image = result.url
                    }
                    const category = await categoryModel.findByIdAndUpdate(id, updateData, { new: true });
                    responseReturn(res, 200, { category, message: 'Category Updated Successfully' });
                } catch (error) {
                    responseReturn(res, 500, { error: 'Internal Server Error' });
                }
            }
        })
    }
    // End method
}

module.exports = new categoryControllers();