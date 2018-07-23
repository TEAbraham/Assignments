import time
import pandas as pd
from bs4 import BeautifulSoup as bs
from splinter import Browser
import requests as req


def init_browser():
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    browser = Browser("chrome", **executable_path, headless=False)


def scrape():

    browser = init_browser()
    mars_data = {}


    # visit the NASA Mars News site and scrape headlines
    nasa_url = 'https://mars.nasa.gov/news/'
    browser.visit(nasa_url)
    soup = bs(browser.html, 'html.parser')

    nasa_headline = soup.find('div', class_='content_title').text
    nasa_teaser = soup.find("div", class_="rollover_description_inner").text
    mars_data['nasa_headline'] = nasa_headline
    mars_data['nasa_teaser'] = nasa_teaser


    # visit the JPL website and scrape the featured image
    jpl_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(jpl_url)
    browser.click_link_by_partial_text('FULL IMAGE')
    browser.find_by_css('a.fancybox-expand')
    soup = bs(browser.html, 'html.parser')

    img = soup.find('img', class_='fancybox-image')['src']
    image_path = f'https://www.jpl.nasa.gov{img}'
    mars_data["feature_image_src"] = image_path



    # visit the mars weather report twitter and scrape the latest tweet
    mars_weather_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(mars_weather_url)
    soup = bs(browser.html, 'html.parser')

    mars_weather = soup.find('p', class_="tweet-text").text
    mars_data["weather_summary"] = mars_weather


    # visit the Mars Facts webpage
    request = req.get("https://space-facts.com/mars/")
    table_read = pd.read_html(request.text)
    mars_facts = pd.DataFrame(table_read[0])
    mars_facts.columns = ["Description","Value"]
    mars_facts_html = mars_facts.to_html(header=False, index=False)
    mars_data["fact_table"] = mars_facts_html

    # scrape images of Mars' hemispheres from the USGS site
    mars_hemisphere_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    hemi_dicts = []

    for i in range(1,9,2):
        hemi_dict = {}
        
        browser.visit(mars_hemisphere_url)
        hemispheres_soup = bs(browser.html, 'html.parser')
        hemi_name_links = hemispheres_soup.find_all('a', class_='product-item')
        hemi_name = hemi_name_links[i].text.strip('Enhanced')
        
        detail_links = browser.find_by_css('a.product-item')
        detail_links[i].click()
        browser.find_link_by_text('Sample').first.click()
        browser.windows.current = browser.windows[-1]
        hemi_img_html = browser.html
        browser.windows.current = browser.windows[0]
        browser.windows[-1].close()
        
        hemi_img_soup = bs(hemi_img_html, 'html.parser')
        hemi_img_path = hemi_img_soup.find('img')['src']

        print(hemi_name)
        hemi_dict['title'] = hemi_name.strip()
        
        print(hemi_img_path)
        hemi_dict['img_url'] = hemi_img_path

        hemi_dicts.append(hemi_dict)

    mars_data["hemisphere_imgs"] = hemi_dicts

    browser.quit()

    return mars_data