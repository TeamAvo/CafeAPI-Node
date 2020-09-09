# CafeAPI - Backend
This is a node.js + express.js + MongoDB api that counts votes. The votes represent the students opinions of the schools meals. Showing the opinions surrounding the food allows students to judge if the meal is worth going to.

# Requests and Responses

## Vote

### Update Vote
Type: POST  
Request: `/vote`  

#### Parameters:  
```json
{
    "date":"Date, YYYY-DD-MMThh:mm:ss+Z",
    "meal":"Meal Type, Integer, 0 ~ 2 inclusive",
    "email":"User Email, String, @avonoldfarms.com",
    "rate":"Rate, Double, 0.5 ~ 5.0 inclusive"
}
```

#### Example:  
```json
{
    "date":"2020-09-09T00:00:00.000+00:00",
    "meal": 1,
    "email":"test@avonoldfarms.com",
    "rate": 4.5
}
```

#### Response:
 - 200: User rate has been successfully reflected.
 - 400: Invalid parameters.
 - 403: Vote has already been registered with this email.
 - 500: MongoDB connection error


### Get Vote
Type: GET  
Request: `/vote`  

#### Parameters:  
```json
{
    "date1":"Start Date, YYYY-DD-MMThh:mm:ss+Z",
    "date2":"End Date, YYYY-DD-MMThh:mm:ss+Z"
}
```

#### Example:  
```json
{
    "date1":"2020-09-09T00:00:00-04:00",
    "date2":"2020-09-10T00:00:00-04:00"
}
```

#### Response:
 - 200: Vote data has been successfully returned.
 - 400: Invalid parameters.
 - 500: MongoDB connection error

#### Return Data:
```json
[
    {
        "date":"Date, YYYY-DD-MMThh:mm:ss+Z",
        "meal":"Meal Type, Integer, 0 ~ 2 inclusive",
        "rate":"Rate, Double, 0.5 ~ 5.0 inclusive",
        "total":"Total number of people who vote, Integer"
    },
    { ... }
]
```

#### Example Data:
```json
[
    {
        "date":"2020-09-09T00:00:00.000Z",
        "meal": 1,
        "rate": 9,
        "total": 2
    },
    {
        "date":"2020-09-09T00:00:00.000Z",
        "meal": 0,
        "rate": 4.5,
        "total": 1
    }
]
```

## Comment

### Post Comment
Type: POST  
Request: `/comment`  

#### Parameters:  
```json
{
    "date":"Date, YYYY-DD-MMThh:mm:ss+Z",
    "name":"User Name, String",
    "email":"User Email, @avonoldfarms.com",
    "pw":"String, MD5 encrypted password",
    "meal":"Meal Type, Integer, 0 ~ 2 inclusive",
    "menu":"String, Meal menu",
    "like":"Boolean",
    "comment":"String, Comment, 5~500"
}
```

#### Example:  
```json
{
    "date":"2020-09-10T01:35:45+09:00",
    "name":"test1",
    "email":"test1@avonoldfarms.com",
    "pw":"4a7d1ed414474e4033ac29ccb8653d9b",
    "meal":1,
    "menu":"apple",
    "like":false,
    "comment":"testcomment12345678910"
}
```

#### Response:
 - 200: User rate has been successfully reflected.
 - 400: Invalid parameters.
 - 403: Vote has already been registered with this email.
 - 500: MongoDB connection error


### Delete Comment
Type: POST  
Request: `/comment`  

#### Parameters:  
```json
{
    "id":"ID from mongodb, ObjectID",
    "pw":"String, MD5 encrypted password"
}
```

#### Example:  
```json
{
    "id":"5f59080a5923552004a899f3",
    "pw":"4a7d1ed414474e4033ac29ccb8653d9b"
}
```

#### Response:
 - 200: User rate has been successfully reflected.
 - 400: Invalid parameters.
 - 403: Vote has already been registered with this email.
 - 500: MongoDB connection error


### Get Comment
Type: GET  
Request: `/comment`  

#### Parameters:  
```json
{
    "date1":"Start Date, YYYY-DD-MMThh:mm:ss+Z",
    "date2":"End Date, YYYY-DD-MMThh:mm:ss+Z"
}
```

#### Example:  
```json
{
    "date1":"2020-09-09T00:00:00-04:00",
    "date2":"2020-09-10T00:00:00-04:00"
}
```

#### Response:
 - 200: Comment data has been successfully returned.
 - 400: Invalid parameters.
 - 500: MongoDB connection error

#### Return Data:
```json
[
    {
        "_id":"Mongodb Object ID",
        "date":"Date, YYYY-DD-MMThh:mm:ss+Z",
        "name":"User Name, String",
        "email":"User Email, @avonoldfarms.com",
        "meal":"Meal Type, Integer, 0 ~ 2 inclusive",
        "menu":"String, Meal menu",
        "like":"Boolean",
        "comment":"String, Comment, 5~500"
    },
    { ... }
]
```

#### Example Data:
```json
[
    {
        "_id":"5f590506bcd6f7120c705050",
        "date":"2020-09-09T16:35:45.000Z",
        "name":"test1",
        "email":"test1@avonoldfarms.com",
        "meal": 0,
        "menu":"apple",
        "like": false,
        "comment":"testcomment12345678910"
    },
    {
        "_id":"5f59062525fcd22d44415efd",
        "date":"2020-09-10T00:00:00.000Z",
        "name":"test2",
        "email":"test2@avonoldfarms.com",
        "meal": 1,
        "menu":"apple",
        "like": true,
        "comment":"testcomment12345678910"
    }
]
```