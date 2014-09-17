class AddLatitudeToNeighborhoods < ActiveRecord::Migration
  def change
    add_column :neighborhoods, :Latitude, :float
  end
end
