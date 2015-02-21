#!/usr/bin/env python
# -*- coding: utf-8 -*-

from geopy.geocoders import Nominatim
from geopy.geocoders import GoogleV3
from geopy.exc import GeocoderTimedOut

import json

def num_there(s):
    return any(i.isdigit() for i in s)

geolocator = Nominatim()
googlegeolocator = GoogleV3(domain='maps.google.de')

to = 3 #timeout
with open('inputjson.json', 'r+') as f:
    data = json.load(f)
    no_location = []
    for a in xrange(len(data['index'])-1):
        try:
            search_string = data['index'][a]['anbieter']
            search_string = search_string + ' Berlin Germany'
            location =  geolocator.geocode(search_string, timeout = to)
            if location:
                print('loc: %s'%location.address.encode('utf-8'))
                data['index'][a]['coordinates'] = [location.latitude, location.longitude]
                data['index'][a]['address'] = location.address.encode('utf-8')
            else:
                print('No address for %s from OSM, testing google next'%search_string.encode('utf-8'))
                try:
                    location =  googlegeolocator.geocode(search_string, timeout = to)
                    if location and num_there(location.address.encode('utf-8')):
                        print('loc: %s'%location.address.encode('utf-8'))
                        data['index'][a]['coordinates'] = [location.latitude, location.longitude]
                        data['index'][a]['address'] = location.address.encode('utf-8')
                    else:
                       no_location.append(data['index'][a]['anbieter'])
                except GeocoderTimedOut as e:
                    print('Error: Geocode failed on input %s with time out on Google'%search_string.encode('utf-8'))
                    no_location.append(data['index'][a]['anbieter'])
        except GeocoderTimedOut as e:
            print('Error: Geocode failed on input %s with time out on OSM'%search_string.encode('utf-8'))
            try:
                location =  googlegeolocator.geocode(search_string, timeout = to)
                if location and num_there(location.address.encode('utf-8')):
                    print('loc: %s'%location.address.encode('utf-8'))
                    data['index'][a]['coordinates'] = [location.latitude, location.longitude]
                    data['index'][a]['address'] = location.address.encode('utf-8')
                else:
                    no_location.append(data['index'][a]['anbieter'])
            except GeocoderTimedOut as e:
                print('Error: Geocode failed on input %s with time out on Google'%search_string.encode('utf-8'))
                no_location.append(data['index'][a]['anbieter'])
        # print updated json data to a new file
        newJsonFile = open('NewJson.json', 'w+') 
        newJsonFile.write(json.dumps(data))
        newJsonFile.close()
        
# provide a .txt file with venues for which no address was found
print 'No addresses found for ', len(no_location), ' venues'
with open('missing.txt', 'w+') as fout:
    for venue in no_location:
        fout.write(venue.encode('utf-8'))
        fout.write('\n')
