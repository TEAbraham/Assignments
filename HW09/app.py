import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData

from flask import Flask, jsonify

engine = create_engine('sqlite:///:memory:')
metadata = MetaData(bind=engine)
Base = automap_base()
Base.prepare(engine, reflect=True)

stations = Base.classes.stations
measurements = Base.classes.measurements

session = Session(engine)

app = Flask(__name__)

def currentday():
    today = datetime.now()
    return today.strftime('%m-%d')

@app.route("/")
def home():
    return (
        f"<bold>Welcome to Hawaiian Climate Research and Analysis!<br/><br/></bold>"
        f"<bold>Database and Research:<br/><br/></bold>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/><br/>"
        f"<bold>Plan A Trip:<br/><br/></bold>"
        f"/api/v1.0/trip/\"startdate as mm-dd\"<br/>"
        f"/api/v1.0/trip/\"startdate as mm-dd\"/\"enddate as mm-dd\"<br/><br/>" 
        )
    
@app.route("/api/v1.0/precipitation")
def getprecipitationinfo():
    year=session.query(measurements.date, func.sum(measurements.prcp)).group_by(measurements.date).filter(measurements.date >(datetime.now() - timedelta(days=365))).all()

    df = pd.DataFrame.from_records(year)
    result = jsonify(df.to_json())
    return result

@app.route("/api/v1.0/stations")
def getstationsinfo():
    stat=session.query(stations).all()
    
    df = pd.DataFrame.from_records(stat)
    result = jsonify(df.to_json())
    return result

@app.route("/api/v1.0/tobs")
def gettemperaturesinfo():
    temp = session.query(measurements.date, func.avg(measurements.tobs)).group_by(measurements.date).filter(measurements.date >(datetime.now() - timedelta(days=365))).all()

    
    df = pd.DataFrame.from_records(temp)
    result = jsonify(df.to_json())
    return result

@app.route("/api/v1.0/trip/<start>")
@app.route("/api/v1.0/trip/<start>/<end>")
def gettripprediction(start,end=currentday()):
    daily = session.query(measurements.date,func.max(measurements.tobs).label('tmax'),func.min(measurements.tobs).label('tmin'),func.avg(measurements.tobs).label('tavg')).filter(measurements.date >= start).filter(measurements.date <= end).group_by(measurements.date).order_by(measurements.date).all()
    
    df = pd.DataFrame.from_records(temp)
    result = jsonify(df.to_json())
    return result

if __name__ == "__main__":
    app.run(debug=True)