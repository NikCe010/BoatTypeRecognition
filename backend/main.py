from flask import Flask

app = Flask(__name__,
            static_url_path='',
            static_folder='result1',
            template_folder='result1')

if __name__ == "__main__":
  app.run()
