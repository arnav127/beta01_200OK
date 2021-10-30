import pickle as pkl
import requests

def recommend_crop(nitrogen, phosphorus, potas, humidity, ph, rainfall, temp, group):
    with open('model.pkl') as f:
        model = pkl.load(f)
    
    # zip probability with name and return top 5

    probs =  model.predict_proba([[nitrogen, phosphorus, potas, humidity, ph, rainfall, temp]])

    return {probs, group}


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

