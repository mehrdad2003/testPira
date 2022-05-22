const router=require('express').Router()
const mainCtrl=require('../controllers/main')
router.get('/',mainCtrl.getPosts)
router.get('/mainSearch',mainCtrl.mainSearch)
router.get('/detailPost/:id',mainCtrl.detailPost)

module.exports=router