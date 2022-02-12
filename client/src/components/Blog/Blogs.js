import React, { useEffect } from 'react'
import BlogArticlePreview from './BlogArticlePreview'
import { useSelector, useDispatch } from 'react-redux'
import { getArticles } from '../../redux/actions'

export default function Blogs() {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArticles())
    }, [])
    console.log(articles)
    return (
        <div className="py-7 px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white">
            {articles.map((article, index)=> {
                return <BlogArticlePreview 
                    key={`article_${index}`}
                    {...article}
                />
            })}
            <BlogArticlePreview isArticleCreator={true}/>
        </div>
    )
}
