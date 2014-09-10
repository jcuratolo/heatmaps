require 'rails_helper'

RSpec.describe "neighborhoods/edit", :type => :view do
  before(:each) do
    @neighborhood = assign(:neighborhood, Neighborhood.create!(
      :RegionName => "MyString",
      :City => "MyString",
      :State => "MyString",
      :Metro => "MyString",
      :CountryName => "MyString",
      :AvgRentPrice => "MyString"
    ))
  end

  it "renders the edit neighborhood form" do
    render

    assert_select "form[action=?][method=?]", neighborhood_path(@neighborhood), "post" do

      assert_select "input#neighborhood_RegionName[name=?]", "neighborhood[RegionName]"

      assert_select "input#neighborhood_City[name=?]", "neighborhood[City]"

      assert_select "input#neighborhood_State[name=?]", "neighborhood[State]"

      assert_select "input#neighborhood_Metro[name=?]", "neighborhood[Metro]"

      assert_select "input#neighborhood_CountryName[name=?]", "neighborhood[CountryName]"

      assert_select "input#neighborhood_AvgRentPrice[name=?]", "neighborhood[AvgRentPrice]"
    end
  end
end
