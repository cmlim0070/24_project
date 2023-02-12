from flask import Flask, request, url_for, render_template
from werkzeug.utils import secure_filename
import os
import time


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'C:/Users/82108/Desktop/졸프/24_project/web-player/code/upload'


@app.route('/')
def render():
    return render_template('player.html')

@app.route('/upload', methods=['GET', 'POST']) # 유저 파일 업로드
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], 'content'))
        return render_template('player.html')


if __name__ == '__main__':
    app.run(debug=True)

app.run(host='127.0.0.1', debug=True)
