import pickle as pkl

def recommend_crop(nitrogen, phosphorus, potas, humidity, ph, rainfall, temp):
    with open('model.pkl') as f:
        model = pkl.load(f)
    
    # zip probability with name and return top 5

    return model.predict([[nitrogen, phosphorus, potas, humidity, ph, rainfall, temp]])


def send_subscription(task):
    pass

