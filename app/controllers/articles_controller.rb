require 'nokogiri'
require 'httparty'

class ArticlesController < ApplicationController

  include HTTParty
  include Nokogiri

  def create
    url = params[:url]
    byebug
    unparsed_page = HTTParty.get(url)
    parsed_page = Nokogiri::HTML(unparsed_page)
    parsed_h1 = parsed_page.css('h1').text
    parsed_img = parsed_page.css('img').attr('src').text
    parsed_p = parsed_page.css('p').text

    
    article = user.articles.create!({
      "title": parsed_h1,
      "image_url": parsed_img,
      "content": parsed_p,
      "link": url,
      "is_read": false,
    })
    render json: article, status: :created
  end

end
