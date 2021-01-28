class GetPrograms < ApplicationRecord


    URL = "https://data.ny.gov/api/views/cgck-srxx/rows.json?accessType=DOWNLOAD"
  
    def self.get_programs
      uri = URI.parse(URL)
      response = Net::HTTP.get_response(uri)
      response.body
    end
  
    def self.parse
      JSON.parse(get_programs) 
    end
  
  
  
  end

#   GetPrograms.neighborhoods.each do |x|
#     Neighborhood.create(name: x)

  
