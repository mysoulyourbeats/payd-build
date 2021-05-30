from flask import Flask
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
import pickle
import numpy as np

from datetime import datetime
import pytz

IST = pytz.timezone('Asia/Kolkata')


cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)
CORS(app)


@app.route('/', methods=["GET"])
def hello_world():
    return {'hello': 'heey'}


@app.route('/tripOver/<userId>/<tripId>/<destination>', methods=["GET"])
def fetch_firebase(userId, tripId, destination):
    now = datetime.now(IST)
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

    tripId_doc = db.collection('tripIdOfVariousUsers').document(tripId)
    driveDataOfThisTrip_ref = tripId_doc.collection(
        'driveDataOfThisTrip').get()

    AX = []
    AY = []
    AZ = []
    GX = []
    GY = []
    GZ = []
    SPEED = []
    SPEEDLIMIT = []

    for i in range(len(driveDataOfThisTrip_ref)):
        AX.append(driveDataOfThisTrip_ref[i].get('acc')['ax'])
        AY.append(driveDataOfThisTrip_ref[i].get('acc')['ay'])
        AZ.append(driveDataOfThisTrip_ref[i].get('acc')['az'])
        GX.append(driveDataOfThisTrip_ref[i].get('gyro')['gx'])
        GY.append(driveDataOfThisTrip_ref[i].get('gyro')['gy'])
        GZ.append(driveDataOfThisTrip_ref[i].get('gyro')['gz'])
        SPEED.append(driveDataOfThisTrip_ref[i].get('speed'))
        SPEEDLIMIT.append(driveDataOfThisTrip_ref[i].get(
            'speedLimit'))
    # # data = [[AX, AY, AZ, GX, GY, GZ]]
    df = pd.DataFrame({'AX': AX, 'AY': AY, 'AZ': AZ,
                      'GX': GX, 'GY': GY, 'GZ': GZ})

    print(df)

    with open('model_pickle.sav', 'rb') as f:
        mp = pickle.load(f)
    y = mp.predict(df)

    print(y)

    behaviour = []
    for i in range(8):
        behaviour.append(np.count_nonzero(y == i+1))
    print(behaviour)
    event_behaviour = (behaviour[0]+behaviour[1]+behaviour[2] +
                       behaviour[3])/sum(behaviour)
    count = 0
    for i in range(len(SPEED)):

        if SPEED[i] > SPEEDLIMIT[i]:
            count += 1
    speeding_behaviour = count*100/len(SPEED)
    speeding_behaviour_r = count/len(SPEED)

    aggressive_behaviour = (1*(speeding_behaviour_r)+2*(event_behaviour))*100/3
    print("Percentage agressive driving is:", aggressive_behaviour)
    analysis = {'sudden_accelerations': behaviour[0], 'sudden_right_turns': behaviour[1],
                'sudden_left_turns': behaviour[2], 'sudden_braking': behaviour[3], 'right_turns': behaviour[4],
                'left_turns': behaviour[5], 'normal_driving': behaviour[6], 'accelerations': behaviour[7],
                'aggresive_percentage': aggressive_behaviour, 'percent_speed_exceeds': speeding_behaviour, 'time_stamp': dt_string, 'destination': destination}

    db.collection('tripAnalysisOfUsers').document(userId).collection(
        'setOfResultsOfEachTripOfThisUser').add(analysis)

    # =========================
    #     DELETE QUERY
    # =========================
    for doc in driveDataOfThisTrip_ref:  # deleting subcollection 'driveDataOfThisTrip'
        doc.reference.delete()

    tripId_doc = tripId_doc.get()
    tripId_doc.reference.delete()

    # =========================
    #     ANNUAL AVG  QUERY
    # =========================

    set_of_avg = db.collection('tripAnalysisOfUsers').document(
        userId).collection('setOfResultsOfEachTripOfThisUser').get()
    add = 0
    for i in range(len(set_of_avg)):
        add += set_of_avg[i].get('aggresive_percentage')
    avg = add/len(set_of_avg)

    # premium calc
    user_doc = db.collection('users').document(userId)
    user_ref = user_doc.get()
    # print(user_ref)

    initprem = user_ref.get('initprem')
    # premium = 0
    if avg <= 25:                   #20% discount
        premium = 0.8*initprem
    elif avg > 25 and avg < 50:     #10% discount
        premium = 0.9*initprem
    elif avg >=50 and avg<75:       #10% additional pemalty
        premium = 1.1*initprem
    else :                          #20% additional penalty
        premium=1.2*initprem

    db.collection('insuranceAmount').document(userId).set(
        {'recentAverage': avg, 'timeStamp': dt_string, 'recentPremium': premium})

    return {'stats': analysis, 'currentAllTripsAvg': avg}