require 'rails_helper'

RSpec.describe "neighborhoods/show", :type => :view do
  before(:each) do
    @neighborhood = assign(:neighborhood, Neighborhood.create!(
      :RegionName => "Region Name",
      :City => "City",
      :State => "State",
      :Metro => "Metro",
      :CountryName => "Country Name",
      :AvgRentPrice => "Avg Rent Price"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Region Name/)
    expect(rendered).to match(/City/)
    expect(rendered).to match(/State/)
    expect(rendered).to match(/Metro/)
    expect(rendered).to match(/Country Name/)
    expect(rendered).to match(/Avg Rent Price/)
  end
end
