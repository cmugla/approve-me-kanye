class LyricsController < ApplicationController

  def index
    @lyric = Lyric.all
    render :json => @lyric
  end

  def show
    @lyric = Lyric.find(params[:id])
    render :json => @lyric
  end

  def create
    @lyric = Lyric.create({
      :author => params[:author],
      :content => params[:content]
      })
    render :json => @lyric
  end

  def update
    @lyric = Lyric.find(params[:id])
    @lyric.update({
      :author => params[:author],
      :content => params[:content]
      })
    render :json => @lyric
  end

  def destroy
    lyric = Lyric.find(params[:id])
    lyric.destroy
    render :json => true
  end

end
