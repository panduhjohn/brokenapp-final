const Blog = require('../models/Blog');

module.exports = {
    getBlogs: (req, res) => {
        Blog.find({}).then((blogs) => {
            return res.json(blogs);
        });
    },

    createBlog: (req, res) => {
        const newBlog = new Blog();

        newBlog.title = req.body.title;
        newBlog.author = req.body.author;
        newBlog.subject = req.body.subject;
        newBlog.article = req.body.article;

        newBlog.save()
            .then((blog) => {
                return res.status(200).json({ message: 'Blog created', blog });
            })
            .catch(err => res.status(400).json({message: 'Blog already in database', err}))
    },

    getBlogById: (req, res) => {
        Blog.findById({ _id: req.params.id }).then((blog) => {
            return res.json(blog);
        });
    },

    updateBlog: (req, res) => {
        Blog.findById({ _id: req.params.id })
            .then((blog) => {
                if (blog) {
                    blog.author = req.body.author
                        ? req.body.author
                        : blog.author;
                    blog.title = req.body.title ? req.body.title : blog.title;
                    blog.subject = req.body.subject
                        ? req.body.subject
                        : blog.subject;
                    blog.article = req.body.article
                        ? req.body.article
                        : blog.article;
                    blog.save()
                        .then((blog) =>
                            res
                                .status(200)
                                .json({ message: 'Blog updated', blog })
                        )
                        .catch((err) =>
                            res
                                .status(400)
                                .json({ message: 'Blog not updated' })
                        );
                }
            })
            .catch((err) =>
                res.status(400).json({ message: 'Server messed up', err })
            );
    },

    deleteBlog: (req, res) => {
        Blog.findByIdAndDelete({ _id: req.params.id })
            .then((blog) => {
                if (blog) {
                    res.status(200).json({ message: 'Blog deleted', blog });
                } else {
                    res.status(400).json({ message: 'Cant find blog' });
                }
            })
            .catch((err) =>
                res.status(400).json({ message: 'Server messed up', err })
            );
    },
};
