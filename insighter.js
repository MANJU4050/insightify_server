const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const getReddit = async (url) => {
	try{
    const response = await fetch(`${url}`);

	const body = await response.text();

    const text = body.replace(/[^a-zA-Z ]/g, " ");
	
    function countWords(str) {
        const arr = str.split(' ');
      
        return arr.filter(word => word !== '').length;
      }
      const count = await countWords(text);
      
      const regexweblink= /(?<=href=")[https|www]+[a-zA-Z0-9-./:?,&$+=@;]+(?=")/g;
      const regexmedialink= /(?<=[^script][(<source)|(<img)|="]+\ssrc=")[(https)|(www)]?[a-zA-Z0-9-./:?,&$+_=@;]+(?=")/g;
      const weblinks = body.match(regexweblink);
      const medialinks = body.match(regexmedialink)
      const id = uuidv4();
      const payload = {
        id:id,
        count:count,
        weblinks:weblinks,
        medialinks:medialinks

      }
      return payload;

  }catch(err){
    return {result:'invalid url'}
  }
};


module.exports = getReddit;
 