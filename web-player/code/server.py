from flask import Flask
from flask.templating import render_template


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('player.html')

app.run(host='127.0.0.1')