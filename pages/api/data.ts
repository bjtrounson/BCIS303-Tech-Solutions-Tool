// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import data from './data.json'

export interface Data {
  techConcepts: (TechConceptsEntity)[];
}
export interface TechConceptsEntity {
  name: string;
  potentialApplications?: (PotentialApplicationsEntity)[] | null;
}
export interface PotentialApplicationsEntity {
  name: string;
  implementations?: (string | null)[] | null;
}

function sortData(filteredApplication: string, techConcepts: TechConceptsEntity[]) {
  let filteredData: TechConceptsEntity[] = []
  for (let index = 0; index < techConcepts.length; index++) {
    const concept = techConcepts[index];
    if (concept) {
      if (concept.potentialApplications) {
        for (let index = 0; index < concept.potentialApplications.length; index++) {
          const application = concept.potentialApplications[index];
          let applicationName = application.name
          let loweredTerm = filteredApplication.toLowerCase()
          let reg = new RegExp(loweredTerm + '.*', 'gi')
          if (applicationName.toLowerCase().match(reg)) {
            filteredData.push({
                "name": concept.name,
                "potentialApplications": [application]
            })
          }
        }
      }
    }
  }
  return filteredData
}

function sortDataByConcept(filteredConcept: string, techConcepts: TechConceptsEntity[]) {
  let filteredData: TechConceptsEntity[] = []
  techConcepts.forEach(concept => {
    concept.potentialApplications?.forEach(application => {
      if (filteredConcept == concept.name) {
        filteredData.push({
          "name": concept.name,
          "potentialApplications": [application]
        })
      }
    })
  })
  return filteredData
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TechConceptsEntity[]>
) {
  if (!req.query.application) {
    if (!req.query.concept) {
      res.send((sortData('', data.techConcepts)))
    }
    const concept: string = req.query.concept as string
    let filteredData = sortData('', data.techConcepts)
    res.send((sortDataByConcept(concept, filteredData)))
  } else {
    if (!req.query.concept) {
      const application: string = req.query.application as string
      res.send((sortData(application, data.techConcepts)))
    }
    const application: string = req.query.application as string
    const concept: string = req.query.concept as string
    let filteredData = sortData(application, data.techConcepts)
    res.send((sortDataByConcept(concept, filteredData)))
  }
}
