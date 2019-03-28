const db = require("../config/database");
const debug = require("debug")("app:childrenController");
const ChildrenModel = require('../modules/ChildrenModel');

function childrenController(nav) {
    function getIndex(req, res) {
        ChildrenModel.findAll()
            .then(children => {
                res.render("childrenListView", {
                    nav,
                    title: "Love the children",
                    children,
                })
            }).catch(err => console.log(err))
    }


    function getById(req, res) {

        const { id } = req.params;
        (async function () {
            const result = await ChildrenModel.findOne({ where: { child_id: id } });
            res.render("childView", {
                nav,
                title: "Love the Children ",
                child: result
            });
        })({})

    }
    function middleWare(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
    return {
        getIndex,
        getById,
        middleWare
    }
};


module.exports = childrenController;