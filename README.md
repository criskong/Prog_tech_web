# EnjoyFood

EnjoyFood is a web app created for the Web Technologies (TW6) exam at the University of Naples "Parthenope"

### The web app can be tested by following this steps:

### 1. Cloning the repository

The repository can be cloned using the following command:

```ps
git clone https://github.com/criskong/Prog_tech_web.git
```

Then go into the generated folder for the next steps

```ps
cd Prog_tech_web
```

### 2. Installing the missing dependencies
    
This can be done by using the following command:

```ps
npm install
```

### 3. Creating and configuring the *.env* file

The *.env* file must be created and placed at the root folder of the project.
This file fill contain all the keys and uris used for connecting to the APIs and the database.

The *.env* file must contain the following variables:

```ps
GOOGLE_CLIENT_ID= "XXXX.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET= "YYYYY"
MONGO_URI = "mongodb+srv://user:pwd@database.sample.mongodb.net/?retryWrites=true&w=majority"
PAYPAL_CLIENT_ID = "ZZZZZ"
PAYPAL_CLIENT_SECRET = "GGGGGGG"
```
The values contained in the variables must be substituted with the real and working ones.

### 4. Start the web app

The web app can be started by typing the following command:

```ps
npm start
```
    
    
