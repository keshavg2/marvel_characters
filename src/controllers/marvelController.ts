import { Request, Response } from 'express';
import axios from 'axios';

export const searchCharacters = async (req: Request, res: Response) => {
    const { search, user } = req.body;

    const crypto = require('crypto');

    const publicKey = process.env.MARVEL_API_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;

    const timestamp = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(timestamp + privateKey + publicKey).digest('hex');

    console.log('Timestamp:', timestamp);
    console.log('Hash:', hash);
    const apiKey = process.env.MARVEL_API_KEY;
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}` + (search ? "&nameStartsWith=" + search : "");

    console.log(user, search, apiUrl);
    try {
        const response = await axios.get(apiUrl);
        console.log(response);
        const characters = response.data.data.results.map((character: any) => character.name);
        console.log('searchCharacters')
        res.json({data: characters});
    } catch (error) {
        console.error('Error fetching Marvel characters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
