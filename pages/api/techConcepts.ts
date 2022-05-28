import { NextApiRequest, NextApiResponse } from 'next';
import { Data } from './data';
import data from './data.json'

function getConcepts(data: Data) {
    const concepts: string[] = []
    data.techConcepts.forEach(concept => {
        concepts.push(concept.name)
    })
    return concepts
}

export default function handler (req: NextApiRequest, res: NextApiResponse) {
    res.send((getConcepts(data)));
}