require 'JSON'
count = 0
datapath = "#{Rails.root}/db/LANeighborhoodsAndCrime.json"
data = JSON.parse(File.read(datapath))
data.each do |d|
#binding.pry
Neighborhood.create!(
  :RegionName => d["RegionName"],
  :City => "Los Angeles",
  :State => "California",
  :ViolentCrimePer10kCapita => d["ViolentCrimePer10kCapita"],
  :AvgRentPrice => d["201407AvgRent"]
)

Neighborhood.last.geo
Neighborhood.last.save


puts Neighborhood.last.RegionName
puts Neighborhood.last.City 
puts Neighborhood.last.State
puts Neighborhood.last.ViolentCrimePer10kCapita
puts Neighborhood.last.AvgRentPrice
puts Neighborhood.last.Latitude
puts Neighborhood.last.Longitude
count+=1
end

puts "created: "+count.to_s+" records."