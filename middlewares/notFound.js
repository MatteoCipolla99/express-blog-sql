const notFound = (req, res, next) =>{
    res.status(400).json({
        error:'Not Found',
        message:'Non trovato'
    });
};

module.exports = notFound;