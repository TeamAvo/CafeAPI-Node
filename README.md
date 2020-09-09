# CafeAPI - Voting

## Summary

This is a node.js + express.js + MongoDB api that counts votes. The votes represent the students opinions of the schools meals. Showing the opinions surrounding the food allows students to judge if the meal is worth going to.

## Requests and Responses

### Vote

#### Update Vote
Type: POST  
Request: `/vote`  

Parameters:  
```json
{
    "date": "Date, YYYY-DD-MMThh:mm:ss+Z",
    "meal": "Meal Type, Integer, 0 ~ 2 inclusive",
    "email": "User Email, @avonoldfarms.com",
    "rate": "Double, 0.5 ~ 5.0 inclusive"
}
```

Example:  
```json
{
    "date": "2020-09-09T00:00:00.000+00:00",
    "meal": 1,
    "email": "test@avonoldfarms.com",
    "rate": 4.5
}
```

#### Get Vote
Type: GET  
Request: `/vote`  

Parameters:  
```json
{
    "date1": "Start Date, YYYY-DD-MMThh:mm:ss+Z",
    "date2": "End Date, YYYY-DD-MMThh:mm:ss+Z"
}
```

Example:  
```json
{
    "date1": "2020-09-09T00:00:00-04:00",
    "date2": "2020-09-10T00:00:00-04:00"
}
```

### Comment

#### Post Comment
Type: POST  
Request: `/comment`  

Parameters:  
```json
{
    "date":"Date, YYYY-DD-MMThh:mm:ss+Z",
    "name":"User Name",
    "email":"User Email, @avonoldfarms.com",
    "pw":"String, MD5 encrypted password",
    "meal":"Meal Type, Integer, 0 ~ 2 inclusive",
    "menu":"String, Meal menu",
    "like":"Boolean",
    "comment":"String, Comment, 5~500"
}
```

Example:  
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

#### Delete Comment
Type: POST  
Request: `/comment`  

Parameters:  
```json
{
    "id": "5f59080a5923552004a899f3",
    "pw":"4a7d1ed414474e4033ac29ccb8653d9b"
}
```

Example:  
```json
{
    "id": "5f59080a5923552004a899f3",
    "pw":"4a7d1ed414474e4033ac29ccb8653d9b"
}
```

#### Get Comment
Type: GET  
Request: `/comment`  

Parameters:  
```json
{
    "date1": "Start Date, YYYY-DD-MMThh:mm:ss+Z",
    "date2": "End Date, YYYY-DD-MMThh:mm:ss+Z"
}
```

Example:  
```json
{
    "date1": "2020-09-09T00:00:00-04:00",
    "date2": "2020-09-10T00:00:00-04:00"
}
```

# Old

## Requests and Responses

### POST

#### Vote Request `/vote`

```json
{
    "time": "Date type variable (new Date())",
    "meal": "Breakfast = 0, Lunch = 1, Dinner = 2",
    "email": "email of the voter",
    "vote": "points value (range: 0.5~5, inclusive)"
}
```

#### Comment Request `/comment`

```json
{
    "date":"Date type variable (new Date())",
    "name":"User name",
    "email":"User email",
    "pw":"Password",
    "meal_type":"Breakfast, Lunch, Dinner",
    "menu":"str, menu, userinput",
    "like":"bool type, true for like, false for dislike",
    "comment":"comment (min: 10, max: 500)"
}
```

#### Comment Request `/delete_comment`

```json
{
    "_id":"comment id",
    "pw":"Password"
}
```

#### Response

Code - `204`

### GET `/`

#### Vote Request Parameters `/vote`

- date1 = Date type variable of the start day
- date2 = Date type variable of the end day

#### Response

```json
[
    {
        "time": "Date type variable (new Date())",
        "vote": "# of points",
        "total": "The number of people who already vote."
    },
    {
        "time": "Next set of times in the sequence",
        "vote": "# of points",
        "total": "The number of people who already vote."
    },
    {
        "time": "Next set of times in the sequence",
        "vote": "# of points",
        "total": "The number of people who already vote."
    },
]
```

Calculation:
```
    Math.round(vote/total)
```


#### Vote Request Parameters `/comment`

- date: date

#### Response
```json
{
    "_id":"comment id",
    "date":"Date type variable (new Date())",
    "name":"User name",
    "email":"User email",
    "meal_type":"Breakfast, Lunch, Dinner",
    "menu":"str, menu, userinput",
    "like":"bool type, true for like, false for dislike",
    "comment":"comment (min: 10, max: 500)"
}
```