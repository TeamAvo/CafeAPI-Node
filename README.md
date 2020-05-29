# CafeAPI - Voting

## Summary

This is a node.js + express.js + MongoDB api that counts votes. The votes represent the students enjoyment of the schools food. Showing the opinions surrounding the food allows students to judge if the meal is worth going to.

## Requests and Responses

### POST `/`

#### Request

```json
{
    "time": {
        "year": "4 digit number for year)",
        "month": "00 => 11, 2 digit number for month",
        "day": "00 => 30, 2 digit number for day",
        "meal": "Breakfast = 0, Lunch = 1, Dinner = 2"
    },
    "email": "email of the voter",
    "vote": "true if upvote false if downvote"
}
```

#### Response

Code - `204`

### GET `/`

#### Request Parameters

- y1 = Start Year
- y2 = End Year
- m1 = Start Month
- m2 = End Month
- d1 = Start Day
- d2 = End Day

`y1, m1, d1` and `y2, m2, d2` define the beginning and end of a range of days that are queried.

- (inclusive : exclusive]

#### Response

```json
[
    {
        "time": {
            "year": "4 digit number for year",
            "month": "00 => 11, 2 digit number for month",
            "day": "00 => 30, 2 digit number for day",
            "meal": "Breakfast = 0, Lunch = 1, Dinner = 2"
        },
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
