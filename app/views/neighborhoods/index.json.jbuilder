json.array!(@neighborhoods) do |neighborhood|
  json.extract! neighborhood, :id, :RegionName, :City, :State, :Metro, :CountyName, :Latitude, :Longitude,:AvgRentPrice
  json.url neighborhood_url(neighborhood, format: :json)
end
