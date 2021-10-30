from bs4 import BeautifulSoup
import requests
import json
from farmer.models import City

def cities():
    url = 'https://mausam.imd.gov.in/imd_latest/contents/districtwise-warning.php?day=Day_2'

    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    script = soup.find_all("script")
    data = script[9].text

    start = data.find("getAreasFromMap") + 36
    end = data.find("export") - 13

    areas = json.loads(data[start:end])

    for area in areas:
        City.objects.create(city=area["title"])