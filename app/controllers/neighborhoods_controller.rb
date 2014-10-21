class NeighborhoodsController < ApplicationController
  before_action :set_neighborhood, only: [:show, :edit, :update, :destroy]

  def index
    @neighborhoods = Neighborhood.all
    respond_to do |format|
      format.json { render json: @neighborhoods }
    end
  end

  
  def show
  end

  def new
    @neighborhood = Neighborhood.new
  end

  def edit
  end

  def create
    @neighborhood = Neighborhood.new(neighborhood_params)

    respond_to do |format|
      if @neighborhood.save
        format.html { redirect_to @neighborhood, notice: 'Neighborhood was successfully created.' }
        format.json { render action: 'show', status: :created, location: @neighborhood }
      else
        format.html { render action: 'new' }
        format.json { render json: @neighborhood.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @neighborhood.update(neighborhood_params)
        format.html { redirect_to @neighborhood, notice: 'Neighborhood was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @neighborhood.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @neighborhood.destroy
    respond_to do |format|
      format.html { redirect_to neighborhoods_url }
      format.json { head :no_content }
    end
  end

  private

    def set_neighborhood
      @neighborhood = Neighborhood.find(params[:id])
    end

    def neighborhood_params
      params.require(:neighborhood).permit(:RegionName, :City, :State, :Metro, :CountyName, :AvgRentPrice, :Latitude, :Longitude, :ViolentCrimePer10kCapita)
    end
end
