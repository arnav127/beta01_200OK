import pickle as pkl
import requests
import os


def recommend_crop(nitrogen, phosphorus, potas, humidity, ph, rainfall, temp, group):
    p = os.path.dirname(os.path.abspath(__file__))
    print(p)
    ap = p + '\\model.pkl'
    with open(ap, 'rb') as f:
        print(ap)
        print("h1")
        model = pkl.load(f)
        print("h2")
    
    # zip probability with name and return top 5
    print("here")
    probs =  model.predict_proba([[nitrogen, phosphorus, potas, humidity, ph, rainfall, temp]])
    prediction_with_name = zip(model.classes_, probs)
    prediction_with_name.sort(key=lambda x: x[1], reverse=True)
    print(prediction_with_name)

    return {prediction_with_name, group}


def send_subscription(task):
    url = "http://localhost:8000/graphql"
    query = """mutation (
        $recs: [String!]
        $group: String!
        ) {
            sendSoilHealth(
                recs: $recs
                group: $group
            ) {
                success
            }
        }"""
    data = {"query":query,
        "variables":{
            "group":task.result['grp'],
            "recs": task.result['prediction']
        }
    }
    r = requests.post(url = url, json = data, headers={"content-type": "application/json"})
    print(r.text)


print(recommend_crop(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 'group'))