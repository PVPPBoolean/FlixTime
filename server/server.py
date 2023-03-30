import numpy as np
import pandas as pd
import math
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, jsonify, request
from flask_cors import CORS
from random import choices
import requests

app = Flask(__name__)
CORS(app)


# or use app.before_request
@app.before_first_request
def readFiles():
    path1 = "./archive/latentMatrixDF1.csv"
    path2 = "./archive/latentMatrixDF2.csv"
    path3 = "./archive/topMovies.csv"

    latent_matrix_1_df = pd.read_csv(path1, index_col=0)
    latent_matrix_2_df = pd.read_csv(path2, index_col=0)
    top_movies_df = pd.read_csv(path3, index_col=0)

    app.config['file1'] = latent_matrix_1_df
    app.config['file2'] = latent_matrix_2_df
    app.config['file3'] = top_movies_df


@app.route('/recommend', methods=['GET'])
def home():
    if (request.method == 'GET'):

        a_1 = np.array(
            app.config['file1'].loc[request.args.get('name')]).reshape(1, -1)

        a_2 = np.array(
            app.config['file2'].loc[request.args.get('name')]).reshape(1, -1)

        score_1 = cosine_similarity(app.config['file1'], a_1).reshape(-1)
        score_2 = cosine_similarity(app.config['file2'], a_2).reshape(-1)
        hybrid = (score_1 + score_2) / 2.0

        dictDF = {
            "content": score_1,
            "collaborative": score_2,
            "hybrid": hybrid
        }
        similar = pd.DataFrame(dictDF, index=app.config['file1'].index)

        similar.sort_values("hybrid", ascending=False, inplace=True)

        recs = similar.iloc[:int(request.args.get('num')), :0].index.tolist()

    data = {
        "num": request.args.get('num'),
        "name": request.args.get('name'),
        "recs": recs
    }
    return jsonify({'data': data})


def getDetails(fullname):
    url = "http://www.omdbapi.com/"
    movieName = fullname.split("(")[0].strip()
    movieYear = fullname.split("(")[-1].split(")")[0].strip()

    querystring = {
        "apikey": "9d11efb1",
        "t": movieName,
        "y": movieYear,
        "plot": "full"
    }

    response = requests.request("GET", url, params=querystring)

    return response.json()


@app.route('/tmovi', methods=['GET'])
def getTopMovies():
    topMovies = choices(app.config['file3']["title"], k=10)

    data = {}

    for movie in topMovies:
        if movie not in data:
            data[movie] = getDetails(movie)

    return jsonify({'data': data})


@app.route("/result", methods=['GET'])
def result():
    groupSize = int(request.args.get('groupSize'))
    user = 8
    movieName = request.args.get('movieName')
    movieName = list(map(str, movieName.split(',')))
    movieRating = request.args.get('movieRating')
    numOfMovies = int(request.args.get('page')) - 1
    movieRating = list(map(int, movieRating.split(',')))
    movieMatrix = [[0 for i in range(groupSize)] for j in range(numOfMovies)]

    for i in range(groupSize):
        for j in range(numOfMovies):
            movieMatrix[j][i] = movieRating[i * numOfMovies + j]
    avg = np.average(movieMatrix, axis=1)
    avgList = avg.tolist()
    d = {}
    for i, index in enumerate(avgList):
        d[i] = index
    movieId = [
        k for k, v in sorted(d.items(), key=lambda item: item[1], reverse=True)
    ]
    movieId = movieId[:4]
    movieName = [movieName[i] for i in movieId]
    avgList.sort(reverse=True)
    s = sum(avgList[:4])

    navgList = list(map(lambda x: math.ceil((x * 20) / s), avgList[:4]))

    recommendations = []

    for i in range(len(movieName)):
        recommendations.extend(testRecommend(movieName[i], navgList[i] + 1))

    return jsonify({
        'movieRating': movieRating,
        'groupSize': groupSize,
        'numOfMovies': numOfMovies,
        'movieName': movieName,
        'navgList': navgList,
        'recs': recommendations
    })


def testRecommend(name, num):
    a_1 = np.array(app.config['file1'].loc[name]).reshape(1, -1)

    a_2 = np.array(app.config['file2'].loc[name]).reshape(1, -1)

    score_1 = cosine_similarity(app.config['file1'], a_1).reshape(-1)
    score_2 = cosine_similarity(app.config['file2'], a_2).reshape(-1)
    hybrid = (score_1 + score_2) / 2.0

    dictDF = {"content": score_1, "collaborative": score_2, "hybrid": hybrid}
    similar = pd.DataFrame(dictDF, index=app.config['file1'].index)

    similar.sort_values("hybrid", ascending=False, inplace=True)

    recs = similar.iloc[1:int(num), :0].index.tolist()

    # return {'recs': recs}
    return recs


if __name__ == '__main__':
    app.run(debug=True)