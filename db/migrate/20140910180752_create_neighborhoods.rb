class CreateNeighborhoods < ActiveRecord::Migration
  def change
    create_table :neighborhoods do |t|
      t.string :RegionName
      t.string :City
      t.string :State
      t.string :Metro
      t.string :CountryName
      t.string :AvgRentPrice

      t.timestamps
    end
  end
end
