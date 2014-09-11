class Neighborhood < ActiveRecord::Base
  validates :RegionName, presence: true

  def address
    return self.RegionName+", "+self.City+", "+self.State
  end

  def geo
      coords = Geokit::Geocoders::MultiGeocoder.geocode(address)
      self.Latitude = coords.lat
      self.Longitude = coords.lng
      puts coords
  end
end
