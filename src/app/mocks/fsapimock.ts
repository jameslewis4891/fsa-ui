export class FSAAPIMock {
    private static authoritiesMock = JSON.parse(`
    {
        "count": 4,
        "authorities": [
            {
                "authorityId": 197,
                "name": "Aberdeen City"
            },
            {
                "authorityId": 198,
                "name": "Aberdeenshire"
            },
            {
                "authorityId": 277,
                "name": "Adur"
            },
            {
                "authorityId": 158,
                "name": "Allerdale"
            }
        ]
    }`);

    private static ratingPercentagesMock = JSON.parse(`
    [
        {
            "rating": "0",
            "percentage": 0.16
        },
        {
            "rating": "1",
            "percentage": 2.72
        },
        {
            "rating": "2",
            "percentage": 1.09
        },
        {
            "rating": "3",
            "percentage": 4.03
        },
        {
            "rating": "4",
            "percentage": 14.38
        },
        {
            "rating": "5",
            "percentage": 63.94
        },
        {
            "rating": "Exempt",
            "percentage": 5.07
        },
        {
            "rating": "AwaitingInspection",
            "percentage": 8.61
        }
    ]`);

    static getAuthorities() {
        return this.authoritiesMock;
    }

    static getRatingPercentages() {
        return this.ratingPercentagesMock;
    }
}
