import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BlogArticleDetails() {
    const { articleId } = useParams()
    const articles = useSelector(state => state.articles)
    const currentArticle = articles.find(article => article.id === articleId)

    const date = new Date(currentArticle?.createdAt)

    return (
        <div className="py-7 px-12">
            <h2 className="text-3xl text-blue-600">{currentArticle.title}</h2>
            <p className="text-sm mt-2 italic text-gray-500">Date: {date.toLocaleString()}</p>
            <div className="text-base mt-7 text-gray-900 text-light leading-relaxed">
                {currentArticle.paraContent.map(para => (
                    <div key={para.id}>
                        <h3 className="text-xl font-semibold text-gray-900">{para.subtitle}</h3>
                        <p className="text-base mt-2 leading-relaxed">{para.paragraph}</p>
                        {para.imageFileURL && (
                            <div className="w-72 h-80 mx-auto mt-2">
                                <img className="max-w-full max-h-full object-cover" src={para.imageFileURL} alt={para.subtitle}/>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <p className="italic text-sm text-right">Written by: {currentArticle?.by}</p>
        </div>
    )
}
