const db=require('../conn')
const mainCtrl={
    getPosts:async(req,res)=>{
        try {
            const allPosts=   await db.orderedList('posts', 'timestamp', 'desc');
          const gh=allPosts.filter(item=>item.post.includes('گردنبند')).slice(0,4)
          const ds=allPosts.filter(item=>item.post.includes('دستبند')).slice(0,4)
          const gho=allPosts.filter(item=>item.post.includes('گوشواره')).slice(0,4)
        const newPro=allPosts.slice(0,10)
        const bestSell=allPosts.slice(10,20)
        const vPro=allPosts.slice(20,30)
            res.render('index', { 
                
                 gh,
                 ds,
                 gho,
                 newPro,
                 bestSell,
                 vPro
                
                });
        } catch (err) {
          console.log(err);  
        }
    },
   mainSearch: async (req, res) => {
        const page = +req.query.page || 0;
       
        try{
            if(!req.query.search) return res.render('404')
            const allPosts=   await db.orderedList('posts', 'timestamp', 'desc');
            const gh=allPosts.filter(item=>item.post.includes('گردنبند')).slice(0,4)
            const ds=allPosts.filter(item=>item.post.includes('دستبند')).slice(0,4)
            const gho=allPosts.filter(item=>item.post.includes('گوشواره')).slice(0,4)
            const news2=allPosts.filter(item=>item.post.includes(req.query.search))
           
        let itemsPerPage =news2.length===1?1:20
        let totalItem=news2.length
        const numberOfPages = Math.floor(news2.length / itemsPerPage)
      
        const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
          const start = index * itemsPerPage
          return news2.slice(start, start + itemsPerPage)
       }) 
       const items=Array.from({length:totalItem/itemsPerPage},(_,index)=>{
         return index
       })
     
     news2.length>0 ?  res.render("products", {
          articles1 : newFollowers,
          page,
          gh,
          ds,
          gho,
          items,
          name:req.query.search,
         }):res.render('404')
      }
       
        catch(error)
        {
            console.log(error);
        }
   
     
    },
    detailPost:async(req,res)=>{
        const post = await db.get(`posts/${req.params.id}`);
        const allPosts=   await db.orderedList('posts', 'timestamp', 'desc');
        const gh=allPosts.filter(item=>item.post.includes('گردنبند')).slice(0,4)
        const ds=allPosts.filter(item=>item.post.includes('دستبند')).slice(0,4)
        const gho=allPosts.filter(item=>item.post.includes('گوشواره')).slice(0,4)
        res.render('detail',{
            post,gh,ds,gho
        })
    }
   
}
module.exports=mainCtrl