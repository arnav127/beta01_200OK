from datagovindia import DataGovIndia
from crops.models import Crops
import pandas as pd


API_KEY = '579b464db66ec23bdd0000011ba9d12290bd43596d85ab8a2ea7bef2'
datagovin = DataGovIndia(API_KEY)

def get_msrp_data():
    data = datagovin.get_data('9ef84268-d588-465a-a308-a864a43d0070', num_results='all')
    da = data.drop(['state', 'district', 'market', 'variety', 'arrival_date'], axis=1)
    da = da.apply(pd.to_numeric, errors='ignore')
    pvt = pd.pivot_table(data=da, index=['commodity'], aggfunc='mean')
    print(pvt)
    print(data.head())
    crops = Crops.objects.all()
    for crop in crops:
        crop.msrp = pvt.loc[crop.name]['modal_price']
        print(crop.name,"\t", crop.msrp)
        crop.save()
