# Metacare

Live URL: https://metacare-node-api.herokuapp.com/

Live Documentation Page: https://metacare-node-api.herokuapp.com/swagger

dockerfile included

api/comment/save: Endpoint to save Comment for Movie

Sample Payload:
{
    "episode_id": 4,
    "comment": "Second Comment"
}

api/character/getcharacterbymovie: Get Characters By Movie with Filter and Sort Capabilities

fetches from https://swapi.dev/api/films/{episode_id}
Sample Payload
{
    "episode_id": 4,  
    "sort": "name", //column to sort
    "order": "asc", //asc or desc order
    "gender": "female" //gender filter
}

api/movie/getmovies:Gets a list of all movies with count of comments

api/comment/getcommentbymovie/{episode_id} : Gets a list of all comments with by episode_id


