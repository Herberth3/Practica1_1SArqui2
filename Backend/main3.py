from flask import Flask, request



app = Flask(__name__)


@app.route('/')
def index():
    return "API is working jus fine! uwu"


if __name__=='__main__':
    app.run(host='localhost',debug=True)