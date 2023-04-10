import json
import app
import io
import logging
import os
import threading

from confugue import Configuration
import flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from note_seq.protobuf.music_pb2 import NoteSequence
from museflow.note_sequence_utils import normalize_tempo
import numpy as np
import tensorflow as tf
import werkzeug.exceptions
from werkzeug.middleware.proxy_fix import ProxyFix

from groove2groove.io import NoteSequencePipeline
from groove2groove.models import roll2seq_style_transfer

from flask import Flask, request, url_for, render_template
from werkzeug.utils import secure_filename
import os
import time


app = Flask(__name__, instance_relative_config=True)
app.config['UPLOAD_FOLDER'] = './uploads'
app.config.from_object('app.config')
app.config.from_pyfile('app.cfg', silent=True)


@app.route('/')
def render():
    return render_template('player.html')


if 'STATIC_FOLDER' in app.config:
    app.static_folder = app.config['STATIC_FOLDER']
    app.static_url_path = '/'


app.wsgi_app = ProxyFix(app.wsgi_app, **app.config.get('PROXY_FIX', {}))
limiter = Limiter(app, key_func=get_remote_address,
                  headers_enabled=True, **app.config.get('LIMITER', {}))
CORS(app, **app.config.get('CORS', {}))

logging.getLogger('tensorflow').handlers.clear()

models = {}
model_graphs = {}
tf_lock = threading.Lock()


@ app.route('/output/', methods=['GET', 'POST'])
@ limiter.limit(app.config.get('MODEL_RATE_LIMIT', None))
def run_model():
    try:
        files = flask.request.files
        files['content_input'].save(
            './static/output/'+secure_filename('content.mid'))
        # files['style_input'].save(
        #     './uploads/'+secure_filename('style.mid'))

        os.system("python -m groove2groove.models.roll2seq_style_transfer --logdir experiments/v01_drums/ run-midi \
                    --sample --softmax-temperature 0.6 \
                    static/output/content.mid static/assets/style.mid static/output/output_midi.mid")

        os.system(
            "timidity --output-mode=w --output-file=static/output/temp.wav static/output/output_midi.mid")
        os.system(
            "sox static/output/temp.wav -r 3k static/output/output.wav trim 0 120 fade 5 -0 8.5 vol 8")

        # bpm = request.get_json()
        # print("------bpm-------")
        # print(bpm)
        # result = json.loads(bpm)
        # print(result)

        return render_template('player.html')
    except Exception as e:
        print(e)
        pass


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=False)
