require 'nokogiri'
require 'httparty'

class ArticlesController < ApplicationController

  include HTTParty
  include Nokogiri

  def create
    url = params[:url]
    unparsed_page = HTTParty.get(url)
    parsed_page = Nokogiri::HTML(unparsed_page.body)

    parsed_h1 = parsed_page.css('h1')
    vetted_h1 = parsed_h1.present? ? parsed_h1.text : "Website cannot be scraped"

    parsed_img = parsed_page.css('img').attr('src')
    vetted_img = parsed_img.present? ? parsed_img.text : "https://i.ibb.co/sw9FSz0/no-image.png"

    parsed_p = parsed_page.css('p')
    combined_content=[]
    vetted_p = parsed_p.present? ? parsed_p.each{|p| 
      combined_content << {content: p.text}
    } : "#{url} is not a site that can be scraped. If you'd like, you can edit the title and img to save."

    article = User.find(params[:user_id]).articles.create!({
      "title" => vetted_h1,
      "image_url" => vetted_img,
      "content" => combined_content,
      "link" => url,
      "is_read" => false,
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
    article = find_article_by_id
    article.update(article_params)
    render json: article, status: :accepted
  end

  def update_all_to_read
    user = User.find(params[:user_id])
    articles = user.articles.order("created_at DESC")
    articles.map{|article| article.is_read = true}
    render json: articles, status: :accepted
  end

  def destroy
    article = find_article_by_id
    article.destroy
    head :no_content
  end

  private

  def find_article_by_id
    Article.find(params[:article_id])
  end

  def article_params
    params.permit(:title, :image_url, :content, :link, :is_read, :articles)
  end

end
