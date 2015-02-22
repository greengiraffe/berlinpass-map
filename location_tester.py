#!/usr/bin/env python
# -*- coding: utf-8 -*-

from geopy.geocoders import Nominatim
from geopy.geocoders import ArcGIS
from geopy.geocoders import GoogleV3
from geopy.geocoders import Yandex
from geopy.geocoders import GeoNames

_NOT_FOUND = "NOT FOUND"
_SUFFIX = " Berlin Germany"
_TIMEOUT = 10
_LOCATIONS = ["Acud Kino e.V.",
              "Maxim Gorki Theater 10117",
              "Kirche zur frohen Botschaft 10318",
              "Modellpark Berlin-Brandenburg",
              "MACHmit! Museum für Kinder",
              "Kino International"]

def test_geolocator(geolocator, _LOCATIONS):
  """Testet Geolocator Abfragen anhand der gegebenen _LOCATIONS
     Printet dazu die zur Eingabe, d.h. die zu der Location gefundene
     Adresse
  """

  for loc in _LOCATIONS:
    loc += _SUFFIX
    result = geolocator.geocode(loc, timeout=_TIMEOUT)
    print(loc)
    if result is not None:
      print(result.address)
      print("LAT", result.latitude)
      print("LON", result.longitude)
      print("-" * 10)
    else:
      print(_NOT_FOUND)
      print("-" * 10)
      
def main():
  """Startet die Tests"""
  
  ########################################
  print("")
  print("Google")
  print("=" * 10)
  googleV3 = GoogleV3(domain="maps.google.de")
  test_geolocator(googleV3, _LOCATIONS)
  ########################################
  print("")
  print("Open Street Map")
  print("=" * 10)
  osm = Nominatim()
  test_geolocator(osm, _LOCATIONS)
  ########################################  
  #print("")
  #print("Yandex")
  #print("=" * 10)
  #yandex = Yandex(lang="de_DE")
  #test_geolocator(yandex, _LOCATIONS)
  ########################################                      
  #print("ArcGIS")
  #print("=" * 10)
  #arcGIS = ArcGIS()
  #test_geolocator(arcGIS, _LOCATIONS)
  ########################################
  #print("GeoNames")
  #print("=" * 10)
  #geoNames = GeoNames()
  #test_geolocator(geoNames, _LOCATIONS)
  ########################################

if __name__ == "__main__":
  main()
