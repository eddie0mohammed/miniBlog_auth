
const Article = require('../models/article');




const getAllArticles = async (req, res, next) => {

    try{

        const articles = await Article.find()

        res.status(200).json({
            status: 'success',
            data: {
                articles: articles
            }
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}


const createArticle = async (req, res, next) => {

    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        details: req.body.details
    });

    try{

        const newArticle = await article.save();

        res.status(201).json({
            status: 'success',
            data: {
                article: newArticle
            }
        });
        

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}



const updateArticle = async (req, res, next) => {

    try{

        const article = await Article.findByIdAndUpdate(req.params.articleId, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'success',
            data: {
                article: article
            }
        });



    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}



const deleteArticle = async (req, res, next) => {

    try{
        await Article.findByIdAndDelete(req.params.articleId);

        res.status(200).json({
            status: 'success',
            message: 'Article deleted'
        });


    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}





module.exports = {
    getAllArticles: getAllArticles,
    createArticle: createArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle
}