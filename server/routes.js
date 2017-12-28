const Posts = require('../database/blogsdb');
module.exports = (app)=>{
    // INDEX and home page
    app.get('/',(req,res)=>{
        res.redirect('/blogs');
     })
    app.get('/blogs',(req,res)=>{
       
       Posts.find({},(err,data)=>{
           if(err)
           console.log('Could not find any data');
           else
           res.render('index',{posts:data});
       })
        
    });

    // NEW ROUTE
    app.get('/blogs/new',(req,res)=>{
        res.render('new');
    });
    // Create ROUTE
    app.post('/blogs',(req,res)=>{
        
        req.body.blog.body = req.sanitize(req.body.blog.body);
        Posts.create(req.body.blog,(err,data)=>{
            if(err)
            res.render('new');
            else
            res.redirect('/blogs');
        })
    });
    //Show Route
    app.get('/blogs/:id',(req,res)=>{
        Posts.findById(req.params.id,(err,data)=>{
            if(err)
            res.redirect('/blogs');
            else
            res.render('show',{post:data});
        })
    });
     //Show Route
     app.get('/blogs/:id/edit',(req,res)=>{
        Posts.findById(req.params.id,(err,data)=>{
            if(err)
            res.redirect('/blogs');
            else
            res.render('edit',{blog:data});
        })
    });
    app.put('/blogs/:id',(req,res)=>{
        req.body.blog.body = req.sanitize(req.body.blog.body);
        Posts.findByIdAndUpdate(req.params.id,req.body.blog,(err,data)=>{
           if(err)
           res.redirect('/blogs');
           else
           res.redirect(`/blogs/${req.params.id}`);
       })
        
    });
    app.delete('/blogs/:id',(req,res)=>{
        Posts.findByIdAndRemove(req.params.id,(err,data)=>{
            if(err)
            res.redirect(`/blogs/${req.params.id}`);
            else
            res.redirect('/blogs');
        })
    })
}