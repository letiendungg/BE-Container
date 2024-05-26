import sys
import os
from dataclasses import dataclass, field
import orjson
from fastapi import FastAPI, Request, Response
from src.sea_route import SeaRoute

@dataclass
class Services:
   """API Services"""
   app: "FastAPI" = field(default_factory=FastAPI)
   request: Request = field(default=None)
   response: Response = field(default=None)

   # define router here
   def __post_init__(self):
      """Post init"""
      self.app.get("/")(self.home)
      self.app.get("/distance")(self.get_distance)

    
   # write router function here
   async def get_distance(self, request: Request, response: Response):
      body = await request.body()
      item = orjson.loads(body)
      # get coordinate from
      address_from = item.get("from")
      # get coordinate to
      address_to = item.get("to")
      
      seaRoute = SeaRoute()
      
      list_location_from = seaRoute.get_location(address_from)
      list_location_to = seaRoute.get_location(address_to)
      
      distance = seaRoute.compute_distance(list_location_from, list_location_to)
       
      return {"data": distance}
   
   
   async def home(self):
      return {"message": "Welcome to the API"}
    
    
   @property
   def __call__(self):
      return self.app