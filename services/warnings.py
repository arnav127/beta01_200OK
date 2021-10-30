from bs4 import BeautifulSoup
import requests
import json
from farmer.models import ExtendUser
from services.sms import send_sms

def weather():
    url = 'https://mausam.imd.gov.in/imd_latest/contents/districtwise-warning.php?day=Day_2'

    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    script = soup.find_all("script")
    data = script[9].text

    start = data.find("getAreasFromMap") + 36
    end = data.find("export") - 13

    #print(data[start:end])
    areas = json.loads(data[start:end])

    send_warning = []
    for area in areas:
        if area["color"] == "#FFFF00":
            send_warning.append(area)

        if area["color"] == "#FF0000":
            send_warning.append(area)

    farmer_phones = []

    for warn in send_warning:
        farmers = ExtendUser.objects.filter(city = warn["title"])
        for farmer in farmers:
            farmer_phones.append(farmer.phone)

    # message = "चेतावनी: आने वाले दिनों में भारी बारिश और तेज तूफान की अत्यधिक संभावना है। कृपया एहतियात बरतें एवं नज़दीकी कृषि केंद्र में संपर्क करें। "
    message = "WARNING: "
    send_sms(farmer_phones, message)

