const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');

class productController {
    add_product = async (req, res) => {
        const {id} = req
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            let {name, price, description, category, stock, discount, shopName, brand} = fields
            const {images} = files;
            name = name.trim();
            const slug = name.split(' ').join('-');
            
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })

            try {
                let allImageUrl = [];
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i].filepath, {folder: 'products'})
                    allImageUrl = [...allImageUrl, result.url]
                }

                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category: category.trim(),
                    description: description.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    images: allImageUrl,
                    brand: brand.trim()
                })
                responseReturn(res, 201, {message: 'Product Added Successfully'})
            } catch (error) {
                responseReturn(res, 500, {error: 'Internal Server Error'})
            }
        })
    }
    // End method
    products_get = async (req, res) => {
        const {page, searchValue, parPage} = req.query;
        const {id} = req

        const skipPage = parseInt(parPage) * (parseInt(page) - 1);
        try {
            if (searchValue) {
                const products = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).skip(skipPage).limit(parPage).sort({createdAt: -1});
                const totalProduct = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).countDocuments();
                responseReturn(res, 200, {products, totalProduct})
            } else {
                const products = await productModel.find({ sellerId: id}).skip(skipPage).limit(parPage).sort({createdAt: -1});
                const totalProduct = await productModel.find({ sellerId: id}).countDocuments();
                responseReturn(res, 200, {products, totalProduct})
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    // End method

    product_get = async (req, res) => {
        const {productId} = req.params;
        try {
            const product = await productModel.findById(productId);
            responseReturn(res, 200, {product})
        } catch (error) {
            console.log(error.message);
        }
    }
    // End method

    product_update = async (req, res) => {
        let {name, description, discount, price, brand, stock, productId} = req.body;
        name = name.trim();
        const slug = name.split(' ').join('-');

        try {
            await productModel.findByIdAndUpdate(productId, {
                name, description, discount, price, brand, stock, slug, productId
            })
            const product = await productModel.findById(productId)
            responseReturn(res, 200, {product, message: 'Product Updated Successfully'})
        } catch (error) {
            responseReturn(res, 500, {error: error.message})
        }
    }
    // End method

    product_image_update = async (req, res) => {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, field, files) => {
            const { oldImage, productId} = field;
            const { newImage } = files;

            if (err) {
                responseReturn(res, 400, {error: err.message})
            } else {
                try {
                    cloudinary.config({
                        cloud_name: process.env.cloud_name,
                        api_key: process.env.api_key,
                        api_secret: process.env.api_secret,
                        secure: true
                    })

                    const result = await cloudinary.uploader.upload(newImage.filepath, {folder: 'products'})

                    if (result) {
                        let product = await productModel.findById(productId)
                        if (!product) {
                            return responseReturn(res, 404, {error: 'Product Not Found'})
                        }

                        const index = product.images.findIndex(img => img === oldImage)
                        if (index !== -1) {
                            product.images[index] = result.secure_url
                            await product.save()
                            const oldImageId = oldImage.split('/').slice(-2).join('/').split('.')[0]
                            await cloudinary.uploader.destroy(oldImageId)
                            product = await productModel.findById(productId)
                            return responseReturn(res, 200, {product, message: 'Product Image Updated Successfully'})
                        } else {
                            return responseReturn(res, 404, {error: 'Old Image Not Found In Product'})
                        }
                    } else {
                        responseReturn(res, 404, {error: 'Image Upload Failed'})
                    }
                } catch (error) {
                    responseReturn(res, 404, {error: error.message})
                }
            }
        })
    }
    // End method
}

module.exports = new productController();