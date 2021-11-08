const got = require('got');
const _ = require('lodash');

exports.getCharacterByMovie = async (episode_id, sort, order, gender) => {
    if (!episode_id) throw new Error("Episode Id is required");
    if (sort) {
        if (sort.toLowerCase() !== 'name' && sort.toLowerCase() !== 'gender' && sort.toLowerCase() !== 'height')
            throw new Error("Sorting is allowed for one of name, gender or height");
        if (!order)
            throw new Error("Order is required when sorting");
        if (order !== 'asc' && order !== 'desc')
            throw new Error("Sort Order should be either asc or desc");
    }
    if(gender){
        if(gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female'){
            throw new Error("Gender should be either male or female")
        }
    }
    var characters = await got.get(`https://swapi.dev/api/films/${episode_id}`, { responseType: 'json' });
    var charactersArray = [];
    if (characters?.body) {
        if (characters?.body?.characters) {
            for (item of characters?.body?.characters) {
                var singlecharacter = await exports.getCharacterByUrl(item);
                charactersArray.push(singlecharacter);
            }
        }
        if (gender) {
            var outputgender = charactersArray.filter(function (character) {
                return character.gender.toLowerCase() == gender.toLowerCase();
            });
            charactersArray = [];
            charactersArray = outputgender;
        }
        if (sort) {
            var outputsort = _.orderBy(charactersArray, [sort], [order]);
            charactersArray = [];
            charactersArray = outputsort;
        }
        var totalheightincm = charactersArray.reduce((n, { height }) => n + parseInt(height), 0);
        var totalheightinfeets = exports.cmToFeet(totalheightincm);
        var metadata = { totalCharacters: charactersArray.length, totalHeightInCM: totalheightincm, totalHeightInFeets: totalheightinfeets };
        return { metadata: metadata, body: charactersArray };
    }
}

exports.getCharacterByUrl = async (url) => {
    var character = await got.get(url, { responseType: 'json' });
    if (character?.statusCode == 200) {
        return {
            name: character?.body?.name,
            height: character?.body?.height,
            hair_color: character?.body?.hair_color,
            skin_color: character?.body?.skin_color,
            eye_color: character?.body?.eye_color,
            birth_year: character?.body?.birth_year,
            gender: character?.body?.gender
        };
    } else return null;
}


exports.cmToFeet = (n) => {
    var realFeet = ((n * 0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = ((realFeet - feet) * 12);
    return feet + "ft and " + inches.toFixed(2) + 'inches';
}

