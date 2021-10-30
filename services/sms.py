from requests import request
from json import loads
from core.settings import SMS_API_KEY
def send_sms(numbers, message):
    numbers_str = ", ".join(numbers)
    # send SMS
    URL = 'https://www.fast2sms.com/dev/bulk'
    my_data = {
        'sender_id': 'FSTSMS', 
        
        'message': message, 
        
        'language': 'english',
        'route': 'p',
        
        'numbers': numbers_str   
    }
    
    headers = {
        'authorization': SMS_API_KEY,
        'Content-Type': "application/x-www-form-urlencoded",
        'Cache-Control': "no-cache"
    }
    response = request("POST", URL, data = my_data, headers = headers)

    msg = loads(response.text)
    return msg['message']

