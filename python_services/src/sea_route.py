import requests

class SeaRoute:
   @staticmethod
   def get_location(address: str):
      url = f"https://api.searoutes.com/geocoding/v2/port?query={address}"

      headers = {
         "accept": "application/json",
         "x-api-key": "fBWR0suRVQ54gkazpF2LpazBvpPnxsa434bITdCJ"
      }

      response = requests.get(url, headers=headers)

      return response["features"][0]["geometry"]["coordinates"]

   @staticmethod
   def compute_distance(list_location_from, list_location_to):
      url = f"https://api.searoutes.com/route/v2/sea/{list_location_from[0]}%2C{list_location_from[1]}%3B{list_location_to[0]}%2C{list_location_to[1]}?continuousCoordinates=true&allowIceAreas=false&avoidHRA=false&avoidSeca=false"
      headers = {
         "accept": "application/json",
         "x-api-key": "fBWR0suRVQ54gkazpF2LpazBvpPnxsa434bITdCJ"
      }
      response = requests.get(url, headers=headers)
      return response["features"][0]["properties"]["distance"]