from datagovindia import DataGovIndia


API_KEY = '579b464db66ec23bdd0000011ba9d12290bd43596d85ab8a2ea7bef2'

datagovin = DataGovIndia(API_KEY)

data = datagovin.get_data('9ef84268-d588-465a-a308-a864a43d0070', num_results='all')



print(data.head())