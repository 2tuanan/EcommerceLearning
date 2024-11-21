const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
class categoryControllers {
    add_category = async (req, res) => {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                responseReturn(res, 404, { error: 'Something went wrong' });
            } else {
                console.log(fields);
                console.log(files);
                name = name.trim();
                const slug = name.split(' ').join('-');
            }
        })    
    }
    get_category = async (req, res) => {
        
    }
}

module.exports = new categoryControllers();