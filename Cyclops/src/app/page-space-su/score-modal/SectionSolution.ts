import { SectionSolutionTags } from "./SectionSolutionTags"
export const SectionSolution : SectionSolutionTags[] = [

    {
        sections : ["Transportation", "Food"],
    
        solution: [
            {
                section: "Food",
                scores: [1,2,3,4,5],
                staramount:[{
                    amount: 1,
                    amountsolution: ["food1","food2"],
                }
                ]
            },
            {
                section: "Transportation",
                scores: [1,2,3,4,5],
                staramount:[{
                    amount: 1,
                    amountsolution: ["transportation1","transportation2"],
                }
                ]
            }
        ]
    }
]    
