require 'JSON'
count = 0
datapath = "#{Rails.root}/db/LARentalPrices.json"
data = JSON.parse(File.read(datapath))
data.each do |d|
#binding.pry
Neighborhood.create!(
  :RegionName => d["RegionName"],
  :City => d["City"],
  :State => d["State"],
  :AvgRentPrice => d["2014-07"]
)

puts Neighborhood.last.RegionName
puts Neighborhood.last.City 
puts Neighborhood.last.State
puts Neighborhood.last.AvgRentPrice
puts Neighborhood.last.Latitude
puts Neighborhood.last.Longitude
count+=1
end

puts "created: "+count.to_s+" records."