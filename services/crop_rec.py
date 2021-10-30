import pickle as pkl
import requests
import os


def recommend_crop(nitrogen, phosphorus, potas, humidity, ph, rainfall, temp, group):
    print("group=", group)
    p = os.path.dirname(os.path.abspath(__file__))
    print(p)
    ap = os.path.join(p, 'model.pkl')
    with open(ap, 'rb') as f:
        print(ap)
        model = pkl.load(f)
    
    # zip probability with name and return top 5
    probs =  model.predict_proba([[nitrogen, phosphorus, potas, humidity, ph, rainfall, temp]])
    print(probs)
    print(model.classes_)
    plist = probs.tolist()
    print(plist[0])
    prediction_with_name = zip(model.classes_, plist[0])
    pwn = sorted(prediction_with_name, key=lambda x: x[1], reverse=True)
    # print("pwitname",prediction_with_name.__len__())
    ans = []
    for x in pwn:
        ans.append(x[0])
        print('x=',x[0])
    
    print("ans=",ans[0:5])

    url = "http://farm-buddy.herokuapp.com/graphql"
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
            "group":group,
            "recs": ans[0:5]
        }
    }
    r = requests.post(url = url, json = data, headers={"content-type": "application/json"})
    print(r.text)

    return True

# def send_subscription(task):
#     url = "http://localhost:8000/graphql"
#     query = """mutation (
#         $recs: [String!]
#         $group: String!
#         ) {
#             sendSoilHealth(
#                 recs: $recs
#                 group: $group
#             ) {
#                 success
#             }
#         }"""
#     data = {"query":query,
#         "variables":{
#             "group":task.result['grp'],
#             "recs": task.result['prediction']
#         }
#     }
#     r = requests.post(url = url, json = data, headers={"content-type": "application/json"})
#     print(r.text)
