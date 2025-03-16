import {PipelineStage} from "mongoose";


interface ICreateAggregationPipelineForTickets {
    matchConditions: any[],
    page: number,
    pageSize: number
}


// Define the pipeline stages
export const createAggregationPipelineForLogs = ({
                                                        matchConditions,
                                                        page,
                                                        pageSize
                                                    }: ICreateAggregationPipelineForTickets): PipelineStage[] => {


    let myPipLine = []


    myPipLine.unshift({
        $sort: {_id: -1 as 1 | -1} // Explicitly type the sort direction as `1 | -1`
    });


    if (matchConditions.length > 0) {
        myPipLine.push({
            $match: {
                $and: matchConditions
            }
        },)
    }


    myPipLine.push(
        {
            $facet: {
                results: [
                    // Apply match conditions before pagination
                    // {
                    //     $match: {
                    //         $and: matchConditions
                    //     }
                    // },
                    // Pagination: Skip and Limit for the current page
                    {
                        $skip: (page - 1) * pageSize
                    },
                    {
                        $limit: pageSize
                    }
                ],
                totalDocuments: [
                    // Apply match conditions for total count
                    // {
                    //     $match: {
                    //         $and: matchConditions
                    //     }
                    // },
                    {
                        $count: "total"
                    }
                ]
            }
        }
    )


    return myPipLine
}
