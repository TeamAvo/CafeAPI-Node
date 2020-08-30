# CafeAPI - Voting

## Summary

This is a node.js + express.js + MongoDB api that counts votes. The votes represent the students opinions of the schools meals. Showing the opinions surrounding the food allows students to judge if the meal is worth going to.

## Requests and Responses

### POST `/`

#### Request

```json
{
    "time": "Date type variable (new Date())",
    "meal": "Breakfast = 0, Lunch = 1, Dinner = 2",
    "email": "email of the voter",
    "vote": "points value (range: 0~5)"
}
```

#### Response

Code - `204`

### GET `/`

#### Request Parameters

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