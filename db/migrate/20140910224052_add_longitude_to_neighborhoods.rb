class AddLongitudeToNeighborhoods < ActiveRecord::Migration
  def change
    add_column :neighborhoods, :Longitude, :float
  end
end
