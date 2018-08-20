import time
import pandas as pd
from bs4 import BeautifulSoup as bs
from splinter import Browser
import requests as req
from io import StringIO

def scrape():
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    browser = Browser("chrome", **executable_path, headless=False)

    air_data = {}
    try:

        #  epa raw data pem 
        pem_url = "https://aqs.epa.gov/api/rawData?user=thomas.e.abraham@gmail.com&pw=khakiosprey52&format=AQCSV&param=81102&bdate=20180601&edate=20180608&state=17&county=031"
        browser.visit(pem_url)
        soup = bs(browser.html, 'html.parser')
        pemdata = StringIO(soup.text)
        air_data["pemdata"] = pemdata
        pemdf = pd.DataFrame(pemdata)


        # visit the JPL website and scrape the featured image
        ozone_url = "https://aqs.epa.gov/api/rawData?user=thomas.e.abraham@gmail.com&pw=khakiosprey52&format=AQCSV&param=44201&bdate=20180601&edate=20180608&state=17&county=031"
        browser.visit(ozone_url)
        soup = bs(browser.html, 'html.parser')
        ozdata = StringIO(soup.text)
        air_data["ozdata"] = ozdata
        ozdf = pd.DataFrame(ozdata)


        # epa raw data carbon monoxide
        co_url = "https://aqs.epa.gov/api/rawData?user=thomas.e.abraham@gmail.com&pw=khakiosprey52&format=AQCSV&param=42101&bdate=20180601&edate=20180608&state=17&county=031"
        browser.visit(co_url)
        soup = bs(browser.html, 'html.parser')
        codata = StringIO(soup.text)
        air_data["codata"] = codata
        codf = pd.DataFrame(codata)
        

    finally:
        browser.quit()

    return air_data, pemdf, ozdf, codf