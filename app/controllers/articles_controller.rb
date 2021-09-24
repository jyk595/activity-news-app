require 'nokogiri'
require 'httparty'

class ArticlesController < ApplicationController

  include HTTParty
  include Nokogiri

  def create
    url = params[:url]
    unparsed_page = HTTParty.get(url)
    parsed_page = Nokogiri::HTML(unparsed_page)
    
    parsed_h1 = parsed_page.css('h1')
    parsed_img = parsed_page.css('img').attr('src')
    parsed_p = parsed_page.css('p')
    
    article = User.find(params[:user_id]).articles.create!({
      "title" => parsed_h1.text,
      "image_url" => parsed_img.text,
      "content" => parsed_p.text,
      "link" => url,
      "is_read" => true,
      "created_at" => params[:created_at]
    })
    render json: article, status: :created
  end

  def conventional_add
    user = User.find(params[:user_id])
    article = user.articles.create!(article_params)
    render json: article, status: :created
  end

  def article_list
    user = User.find(params[:user_id])
    articles = user.articles.order("created_at DESC")
    render json: articles
  end

  def update
    article = Article.find(params[:article_id])
    article.update(article_params)
    render json: article, status: :accepted
  end

  private

  def article_params
    params.permit(:title, :image_url, :content, :link, :is_read)
  end

end
