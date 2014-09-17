class AddViolentCrimePer10kCapitaToNeighborhoods < ActiveRecord::Migration
  def change
    add_column :neighborhoods, :ViolentCrimePer10kCapita, :float
  end
end
