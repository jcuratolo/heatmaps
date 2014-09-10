require 'rails_helper'

RSpec.describe "neighborhoods/index", :type => :view do
  before(:each) do
    assign(:neighborhoods, [
      Neighborhood.create!(
        :RegionName => "Region Name",
        :City => "City",
        :State => "State",
        :Metro => "Metro",
        :CountryName => "Country Name",
        :AvgRentPrice => "Avg Rent Price"
      ),
      Neighborhood.create!(
        :RegionName => "Region Name",
        :City => "City",
        :State => "State",
        :Metro => "Metro",
        :CountryName => "Country Name",
        :AvgRentPrice => "Avg Rent Price"
      )
    ])
  end

  it "renders a list of neighborhoods" do
    render
    assert_select "tr>td", :text => "Region Name".to_s, :count => 2
    assert_select "tr>td", :text => "City".to_s, :count => 2
    assert_select "tr>td", :text => "State".to_s, :count => 2
    assert_select "tr>td", :text => "Metro".to_s, :count => 2
    assert_select "tr>td", :text => "Country Name".to_s, :count => 2
    assert_select "tr>td", :text => "Avg Rent Price".to_s, :count => 2
  end
end
