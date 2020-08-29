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
    "vote": "true if upvote false if downvote"
}
```

#### Response

Code - `204`

### GET `/`

#### Request Parameters

- date1 = Date type variable of the start day
- date2 = Date type variable of the end day

- [inclusive : exclusive)

#### Response

```json
[
    {
        "time": "Date type variable (new Date())",
        "vote": "# of votes"
    },
    {
        "time": "Next set of times in the sequence",
        "vote": "# of votes"
    },
    {
        "time": "Next set of times in the sequence",
        "vote": "# of votes"
    },
]
```
