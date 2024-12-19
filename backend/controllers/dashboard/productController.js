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

}

module.exports = new productController();