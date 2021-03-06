# Prazor JSON API
Documentation around the Prazor API rest services.

## Rest Services:

### Teaching
Returns all categories: `/rest/getTeachingCategories`
```javascript
{
	"categories": [

		{
			"category_id": "4",
			"category_name": "Family",
			"category_image": "http://prazor.com/images/uploads/genre/dummy-239x179-Floral.jpg",
			"category_desc": ""
		},
		...
	]
}
```

Returns all partners:  `/rest/getPartners`
```javascript
[
    {
        title: "Test Teaching Partner",
        entry_id: 10,
        kaltura_playlist_url: "http://www.kaltura.com/api_v3/getFeed.php?partnerId=1949551&feedId=1_atji3zm1&format=1",
        partner_thumbnail: "http://prazor.com//images/uploads/partners/CYL200Thumb.jpg",
        partner_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet eros non sapien porta tempor sed vitae felis. Curabitur dictum libero at urna dignissim, eu fringilla turpis suscipit. Pellentesque neque nibh, bibendum consequat mattis sed, accumsan vitae quam. Praesent molestie rhoncus nisi sed viverra. "
    }
]
```

### Talk
Returns all categories: `/rest/getTalkCategories`
```javascript

{
	"categories": [

		{
			"category_id": "1",
			"category_name": "Politics",
			"category_image": "http://prazor.com/images/uploads/genre/dummy-239x179-Bottles.jpg",
			"category_desc": ""
		},
		...
	]
}
```


Returns all talk entries:  `/rest/getTalk`
```javascript
[
    {
        title: "Mike Huckabee & Terry Sacka",
        entry_id: 11,
        kaltura_playlist_url: "http://www.kaltura.com/api_v3/getFeed.php?partnerId=1949551&feedId=1_atji3zm1&format=1",
        partner_thumbnail: "",
        partner_description: ""
    }
]
```

Returns all talk entries in a given category:  `/rest/getTalk/category/1`

```javascript
[
    {
        title: "Mike Huckabee & Terry Sacka",
        entry_id: 11,
        kaltura_playlist_url: "http://www.kaltura.com/api_v3/getFeed.php?partnerId=1949551&feedId=1_atji3zm1&format=1",
        partner_thumbnail: "",
        partner_description: "",
        categories: [
            {
                category_id: 1,
                parent_id: 0,
                category_name: "Politics",
                category_image: "",
                category_description: "",
                category_group: "1",
                category_url_title: "politics"
            }
        ]
    }
]
```

### Music

Returns all Genres:  `/rest/getGenres`
* example: /rest/getGenres/

```javascript
[
	{
		title: "Premium",
		genre_image: "",
		entry_id: 9
	},
	{
		title: "Ecletic",
		genre_image: "",
		entry_id: 8
	}
	
	...
]
```

Returns Genre Details and stations:  `/rest/getGenres/details/<ENTRY_ID>`
* example: /rest/getGenres/details/1

```javascript
[{
	title: "Rock",
	entry_id: 1,
	genre_image: "",
	stations: [{
		row_id: 1,
		station_name: "Generation Z",
		station_image: "",
		station_id: "PRAZOR1",
		station_information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	}, {
		row_id: 2,
		station_name: "Upbeat",
		station_image: "",
		station_id: "PRAZOR2",
		station_information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	}, {
		row_id: 3,
		station_name: "Ageless Rock",
		station_image: "",
		station_id: "PRAZOR3",
		station_information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	}],
	
	....
}]
```
