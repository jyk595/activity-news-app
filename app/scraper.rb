require 'nokogiri'
require 'httparty'
require 'byebug'

def scraper
  url = "https://www.nytimes.com/2021/09/21/technology/zuckerberg-facebook-project-amplify.html"
  unparsed_page = HTTParty.get(url)
  parsed_page = Nokogiri::HTML(unparsed_page)
end

scraper