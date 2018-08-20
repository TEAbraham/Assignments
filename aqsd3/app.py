from flask import Flask, render_template
import pymongo
import scrape_air

# create instance of Flask app
app = Flask(__name__)

# create mongo connection
client = pymongo.MongoClient()
db = client.air_db
collection = db.air_data_entries

@app.route("/")
def home():
    air_data = db.collection.find_one()
    return  render_template('index.html', air_data=air_data)

@app.route("/scrape")
def web_scrape():
    db.collection.remove({})
    air_data = scrape_air.scrape()
    db.collection.insert_one(air_data)
    return  render_template('index.html', air_data=air_data)

if __name__ == "__main__":
    app.run(debug=True)