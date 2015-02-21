from geopy.geocoders import Nominatim
geolocator = Nominatim()

import json
from pprint import pprint

with open('/Users/bs/Desktop/HackdayBerlin/berlinpass_db.json') as json_data:
  
    data = json.load(json_data)
     
    
    dict_data = dict(data)
    
    end = dict_data['results']['count']  
    
    for i in range(0,320):
        anbieter1 = (dict_data['index'][i]['anbieter'])
        print anbieter1
        
        location = geolocator.geocode(anbieter1 + " Berlin", timeout=5)
        if location is not None:
            print(location.address)

            print((location.latitude, location.longitude))
