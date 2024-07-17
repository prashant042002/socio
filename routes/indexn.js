var express = require("express")
var router = express.Router()
var userModel = require("./users")
const passport = require("passport")
const localStrategy = require("passport-local")

passport.use(new localStrategy(userModel.authenticate()))

router.get("/", (req,res)=>{
    res.render("index", {footer: false})
})
router.get("/login", (req,res)=>{
    res.render("login", {footer: false})
})
router.get("/feed", (req,res)=>{
    res.render("feed", {footer: true})
})
router.get("/profile", (req,res)=>{
    res.render("profile", {footer: true})
})
router.get("/search", (req,res)=>{
    res.render("search", {footer: true})
})
router.get("/edit", (req,res)=>{
    res.render("edit", {footer: true})
})
router.get("/upload", (req,res)=>{
    res.render("upload", {footer: true})
})
router.post("/register", function(req,res){
    const user = new userModel({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email
    });

    userModel.register(user, req.body.password)
        .then(function(){
            passport.authenticate("local")(req,res,function(){
                res.redirect("/profile");
            })
        })
})

router.post("/login", passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));
module.exports = router;
