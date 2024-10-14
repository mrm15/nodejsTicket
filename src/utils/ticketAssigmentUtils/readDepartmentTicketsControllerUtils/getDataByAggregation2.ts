import {createAggregationPipeline} from "./aggregationPipeline";
import {TicketAssignment} from "../../../models/ticketAssignment ";
import processFilterOperators from "./processFilterOperators";

interface inputObjectGetDataByAggregation2 {
    filters: any[],
    page: number,
    pageSize: number
}

const getDataByAggregation2 = async ({filters, page, pageSize}: inputObjectGetDataByAggregation2) => {

    const matchConditions =[]
    // Apply filters dynamically (if any exist in the payload)
    if (filters && filters.length > 0) {
        filters.forEach((filter: any) => {
            matchConditions.push(processFilterOperators(filter));
        });
    }

    // Create the pipeline using match conditions and pagination details
    const myPipeline = createAggregationPipeline({matchConditions: filters, page, pageSize});

    const result = await TicketAssignment.aggregate(myPipeline);


    // Extract results and total document count
    const results = result[0]?.results;
    const totalDocuments = result[0]?.totalDocuments?.length > 0 ? result[0]?.totalDocuments[0]?.total : 0;

    return {
        results,           // Paginated results from aggregation
        totalDocuments,    // Total count from facet pipeline
        page,       // The current page number
        pageSize,        // The page size used for pagination

        allResultData: result
    };
};

export default getDataByAggregation2;
