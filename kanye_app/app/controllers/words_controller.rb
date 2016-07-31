class WordsController < ApplicationController
  def index
    url = "http://www.kanyerest.xyz/api/counter"
    response = HTTParty.get(url)
    parsed_body = JSON.parse(response.body)
    render json: parsed_body
  end
end
