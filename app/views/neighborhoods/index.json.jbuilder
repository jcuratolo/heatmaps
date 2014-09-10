json.array!(@neighborhoods) do |neighborhood|
  json.extract! neighborhood, :id, :RegionName, :City, :State, :Metro, :CountryName, :AvgRentPrice
  json.url neighborhood_url(neighborhood, format: :json)
end
